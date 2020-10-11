'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Products extends Model {
   
    static associate(models) {
      Order_Products.belongsTo(models.Sales_Orders, {
        as: 'Sales_Orders',
        foreignKey: 'order_id'
      });
    }
  };
  Order_Products.init({
    order_id: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.NUMERIC,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'Order_Products',
    tableName: 'Order_Products',
    underscored: true
  });
  return Order_Products;
};