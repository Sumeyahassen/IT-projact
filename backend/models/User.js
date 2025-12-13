// This file is now empty - model defined in index.js
// models/User.js

const { sequelize } = require('./index');  // ← Get the sequelize instance from index.js
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'farmer', 'agent', 'extension'),
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,  // createdAt and updatedAt columns
});

module.exports = null;
