'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    await queryInterface.bulkInsert('users', [{
         name: 'John Doe',
         email: 'john@gmail.com',
         uuid: 'e9698a07-9f69-4cf2-b9bf-7a72aad42ee3',
         role: 'admin',
         createdAt: "2024-09-11T09:50:43.847Z",
         updatedAt: "2024-09-11T13:11:08.378Z",
       },
      
       {
        name: 'Jahn Doe',
        email: 'jahn@gmail.com',
        uuid: 'e9698a07-9f69-4cf2-b9bf-7a72aad43ee3',
        role: 'admin',
        createdAt: "2024-09-11T09:50:43.847Z",
        updatedAt: "2024-09-11T13:11:08.378Z",
      }
      ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
