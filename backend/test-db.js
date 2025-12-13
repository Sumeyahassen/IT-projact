require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    console.log('Database name:', sequelize.getDatabaseName());
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await sequelize.close();
  }
}

testConnection();