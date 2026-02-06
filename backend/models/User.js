// models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'phone_number'  // maps to phone_number column in DB
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Addis Ababa'  // default for admin
    },
    role: {
      type: DataTypes.ENUM('farmer', 'agent', 'extension', 'admin'),
      allowNull: false,
      defaultValue: 'farmer'
    },
    password: {  // renamed from password_hash for clarity
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',  // table name in DB
    timestamps: true,     // adds createdAt / updatedAt
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });

  // Method to check password
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};