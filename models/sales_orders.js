'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales_Orders extends Model {
    static associate(models) {
      Sales_Orders.belongsTo(models.Users, {
        as: 'Users',
        foreignKey: 'user_id'
      });

      Sales_Orders.belongsTo(models.Coupons, {
        as: 'Coupons',
        foreignKey: 'coupon_id'
      });

      Sales_Orders.belongsTo(models.Sessions, {
        as: 'Sessions',
        foreignKey: 'session_id'
      });

      Sales_Orders.hasMany(models.CC_Transactions, {
        as: 'CC_Transactions',
        foreignKey: 'id'
      });
      
      Sales_Orders.hasMany(models.Order_Products, {
        as: 'Order_Products',
        foreignKey: 'id'
      });
    }
  };
  Sales_Orders.init({
    order_date: DataTypes.DATE,
    total: DataTypes.NUMERIC,
    coupon_id: DataTypes.INTEGER,
    session_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sales_Orders',
    tableName: 'Sales_Orders',
    underscored: true
  });
  return Sales_Orders;
};