'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      product_status_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Product_Statuses',
          key:'id'
        }
      },
      regular_price: {
        type: Sequelize.NUMERIC
      },
      discount_price: {
        type: Sequelize.NUMERIC
      },
      quantity: {
        type: Sequelize.NUMERIC
      },
      taxable: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};