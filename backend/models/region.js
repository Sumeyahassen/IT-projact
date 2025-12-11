'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    static associate(models) {
      Region.hasMany(models.Price, { foreignKey: 'regionId' });
    }
  }
  Region.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    amharicName: DataTypes.STRING
  }, { sequelize, modelName: 'Region' });
  return Region;
};