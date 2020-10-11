'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
 
    static associate(models) {
      Categories.belongsToMany(models.Products, {
        through:'Product_Categories',
        as: 'Products',
        foreignKey: 'category_id'
      });
      Categories.hasMany(models.Categories, {
        as: 'Categories',
        foreignKey: 'parent_id'
      });
    }
  };
  Categories.init({
    name: DataTypes.STRING,
    parent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categories',
    tableName: 'Categories',
    underscored: true
  });
  return Categories;
};