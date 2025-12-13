const { sequelize, User } = require('./index');
const { DataTypes } = require('sequelize');

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

// Association
ProductPrice.belongsTo(User, { foreignKey: 'updated_by', as: 'agent' });

module.exports = ProductPrice;