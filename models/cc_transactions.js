'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CC_Transactions extends Model {
 
    static associate(models) {
      CC_Transactions.belongsTo(models.Sales_Orders, {
        as: 'Sales_Orders',
        foreignKey: 'order_id'
      });
    }
  };
  CC_Transactions.init({
    code: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    transdate: DataTypes.DATE,
    processor: DataTypes.STRING,
    processor_trans_id: DataTypes.STRING,
    amount: DataTypes.NUMERIC,
    cc_num: DataTypes.STRING,
    cc_type: DataTypes.STRING,
    response: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CC_Transactions',
    tableName: 'CC_Transactions',
    underscored: true
    
  });
  return CC_Transactions;
};