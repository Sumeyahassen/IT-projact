const sequelize = require('./models/index');
const User = require('./models/User');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection confirmed again.');

    await sequelize.sync({ force: false });  // Creates tables if they don't exist
    console.log('✅ Tables synced successfully! "users" table is ready.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing database:', error.message);
    process.exit(1);
  }
}

syncDatabase();
