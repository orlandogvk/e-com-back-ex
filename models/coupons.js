'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupons extends Model {
  
    static associate(models) {
      Coupons.hasMany(models.Sales_Orders, {
        as: 'Sales_Orders',
        foreignKey: 'id'
      });
    }
  };
  Coupons.init({
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    value: DataTypes.NUMERIC,
    multiple: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Coupons',
    tableName: 'Coupons',
    underscored: true
  });
  return Coupons;
};