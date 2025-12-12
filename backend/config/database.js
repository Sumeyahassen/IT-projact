const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(
  process.env.DB_NAME || 'ethiopia_agri',
  process.env.DB_USER || 'agri_user',
  process.env.DB_PASS || '12345',
  {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  }
);
