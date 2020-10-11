'use strict';

let couponsArray = [
  {
    code: "w9oiqw1002",
    description:"couponmorecouponasdasd",
    active:true,
    value:5,
    multiple:false,
    start_date:new Date(),
    end_date:new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let coupons = await queryInterface.bulkInsert('Coupons', couponsArray, {returning: true});
   console.log(coupons);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Coupons', null, {});
  }
};
