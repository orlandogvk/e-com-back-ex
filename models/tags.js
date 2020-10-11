'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    
    static associate(models) {
      // define association here
      Tags.belongsToMany(models.Products, {
        through:'Product_Tags',
        as: 'Products',
        foreignKey: 'tag_id'
      });

    }
  };
  Tags.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tags',
    tableName: 'Tags',
    underscored: true
  });
  return Tags;
};