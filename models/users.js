'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      Users.belongsToMany(models.Roles, {
        through:'User_Roles',
        as: 'Roles',
        foreignKey: 'user_id'
      });
      Users.hasMany(models.Sales_Orders, {
        as: 'Sales_Orders',
        foreignKey: 'id'
      });
    }
  };
  Users.init({
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    underscored: true
  });
  return Users;
};