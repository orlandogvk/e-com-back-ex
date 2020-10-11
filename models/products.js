'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Product_Statuses, {
        as: 'Product_Statuses',
        foreignKey: 'product_status_id'
      });
      Products.belongsToMany(models.Categories, {
        through:'Product_Categories',
        as: 'Categories',
        foreignKey: 'product_id'
      });
      Products.belongsToMany(models.Tags, {
        through:'Product_Tags',
        as: 'Tags',
        foreignKey: 'product_id'
      });

    }
  };
  Products.init({
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    product_status_id: DataTypes.INTEGER,
    regular_price: DataTypes.NUMERIC,
    discount_price: DataTypes.NUMERIC,
    quantity: DataTypes.NUMERIC,
    taxable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'Products',
    underscored: true
  });
  return Products;
};