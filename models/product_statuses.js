'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Statuses extends Model {
  
    static associate(models) {
      // define association here
      Product_Statuses.hasMany(models.Products, {
        as: 'Products',
        foreignKey: 'id'
      });
    }
  };
  Product_Statuses.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product_Statuses',
    tableName: 'Product_Statuses',
    underscored: true
  });
  return Product_Statuses;
};