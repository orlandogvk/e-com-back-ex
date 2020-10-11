'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Roles extends Model {
    
    static associate(models) {
      // define association here
      
    }
  };
  User_Roles.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Roles',
    tableName: 'User_Roles',
    underscored: true
  });
  return User_Roles;
};