require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

// Create sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Define User model
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
  timestamps: true,
});

// Define ProductPrice model
const ProductPrice = sequelize.define('ProductPrice', {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price_per_kg: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'product_prices',
  timestamps: true,
});

// Associations
ProductPrice.belongsTo(User, { foreignKey: 'updated_by', as: 'agent' });
User.hasMany(ProductPrice, { foreignKey: 'updated_by', as: 'prices' });

// Export
module.exports = {
  sequelize,
  User,
  ProductPrice,
};