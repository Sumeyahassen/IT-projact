const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createAdmin() {
  try {
    const password = 'admin123';  // Change this later!
    const password_hash = await bcrypt.hash(password, 10);

    const admin = await User.create({
      full_name: 'Super Admin',
      phone_number: '0911111111',  // Use any phone number
      region: 'Addis Ababa',
      role: 'admin',
      password_hash,
    });

    console.log('✅ Admin user created successfully!');
    console.log('Login with:');
    console.log('Phone: 0911111111');
    console.log('Password: admin123');
    console.log('\n⚠️  Change the password immediately after first login!');

    process.exit(0);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.log('Admin already exists.');
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

createAdmin();
