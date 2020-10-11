'use strict';

let sessionsArray = [
  {
    //id: "u8sua9s8a9s",
    data: "w9oiqw1002",
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
   let sessions = await queryInterface.bulkInsert('Sessions', sessionsArray, {returning: true});
   console.log(sessions);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Sessions', null, {});
  }
};
