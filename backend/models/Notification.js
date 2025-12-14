const { sequelize, User } = require('./index');
const { DataTypes } = require('sequelize');

const Notification = sequelize.define('Notification', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true,  // null = all regions
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'notifications',
  timestamps: true,
});

// Association
Notification.belongsTo(User, { foreignKey: 'created_by', as: 'extension' });

module.exports = Notification;

