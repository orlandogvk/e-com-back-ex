'use strict';
const users = [{
  email: "luis20@gmail.com",
  first_name: "Luis",
  last_name: "Gutierrez",
  password: 'luis08',
  token: 'sajdaopwpoqe',
  active: false,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  email: "ana07@gmail.com",
  first_name: "Ana",
  last_name: "Gutierrez",
  password: 'ana12345',
  token: 'sajdaopsas123wpoqe',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date()
}];

const roles = [{
  name: "Administrador",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: "Cliente",
  createdAt: new Date(),
  updatedAt: new Date()
}];

let userRoles = [
  {
    user_id: 2,
    role_id: 6, 
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

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
   let rolesR = await queryInterface.bulkInsert('Roles', roles, {returning: true});
    let usersR = await queryInterface.bulkInsert('Users', users, {returning: true});
    let {id: adminId} = rolesR.find( role => role.name === 'Administrador');
    // let adminId = rolesR.find( role => role.name === 'Administrador').id;
    let {id: userId} = usersR.find( user => user.email === 'luis20@gmail.com');
    // let userId = usersR.find( user => user.email === 'luis20@gmail.com').id;
    userRoles[0].user_id = userId;
    userRoles[0].role_id = adminId;
    let userRolesR = await queryInterface.bulkInsert('User_Roles', userRoles, {returning: true});
    console.log(rolesR, usersR, userRolesR);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User_Roles', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Users', null, {});

  }
};
