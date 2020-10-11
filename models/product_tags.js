'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Tags extends Model {
    static associate(models) {
      // define association here
    }
  };
  Product_Tags.init({
    product_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_Tags',
    tableName: 'Product_Tags',
    underscored: true
  });
  return Product_Tags;
};