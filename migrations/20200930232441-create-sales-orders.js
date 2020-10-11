'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales_Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_date: {
        type: Sequelize.DATE
      },
      total: {
        type: Sequelize.NUMERIC
      },
      coupon_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Coupons',
          key:'id'
        }
      },
      session_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Sessions',
          key:'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        }
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
    await queryInterface.dropTable('Sales_Orders');
  }
};