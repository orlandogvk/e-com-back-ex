'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {

    static associate(models) {
      Sessions.hasMany(models.Sales_Orders, {
        as: 'Sales_Orders',
        foreignKey: 'id'
      });
    }
  };
  Sessions.init({
    data: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sessions',
    tableName: 'Sessions',
    underscored: true
  });
  return Sessions;
};