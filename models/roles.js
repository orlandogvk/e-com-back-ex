'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    
    static associate(models) {
      // define association here
      Roles.belongsToMany(models.Users, {
        through:'User_Roles',
        as: 'Users',
        foreignKey: 'role_id'
      });
    }
  };
  Roles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'Roles',
    underscored: true
    
  });
  return Roles;
};