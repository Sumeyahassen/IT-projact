require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false
});

const User = sequelize.define('User', {
  username: { type: Sequelize.STRING, allowNull: false },
  phone: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.ENUM('farmer', 'agent', 'extension', 'admin'), defaultValue: 'farmer' },
  region: { type: Sequelize.STRING, defaultValue: 'Addis Ababa' }
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

async function createAdmin() {
  try {
    // 1. Connect & authenticate
    await sequelize.authenticate();
    console.log('Connected to Render database');

    // 2. Create or sync the Users table (safe - won't delete data)
    await sequelize.sync({ alter: true });
    console.log('Users table is ready (created or already exists)');

    // 3. Check if admin already exists
    const existing = await User.findOne({ where: { phone: '0911111111' } });
    if (existing) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    // 4. Create admin
    await User.create({
      username: 'SuperAdmin',
      phone: '0911111111',
      password: 'admin123',
      role: 'admin',
      region: 'Addis Ababa'
    });

    console.log('✅ Admin created successfully in cloud database!');
    console.log('Login with:');
    console.log('Phone: 0911111111');
    console.log('Password: admin123');
    console.log('\n⚠️ Change password immediately after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();