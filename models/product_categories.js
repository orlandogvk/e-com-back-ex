'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Categories extends Model {
  
    static associate(models) {
      // define association here
    }
  };
  Product_Categories.init({
    category_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Categories',
    tableName: 'Product_Categories',
    underscored: true
  });
  return Product_Categories;
};