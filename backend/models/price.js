'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    static associate(models) {
      Price.belongsTo(models.Product, { foreignKey: 'productId' });
      Price.belongsTo(models.Region, { foreignKey: 'regionId' });
      Price.belongsTo(models.User, { as: 'agent', foreignKey: 'updatedBy' });
    }
  }
  Price.init({
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    recordedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    regionId: { type: DataTypes.INTEGER, allowNull: false },
    updatedBy: { type: DataTypes.INTEGER, allowNull: false }
  }, { sequelize, modelName: 'Price' });
  return Price;
};