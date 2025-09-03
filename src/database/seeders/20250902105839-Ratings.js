'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ratings', [
      {
        Id: '665cb50f-d015-4d73-937f-2be9cc0b096f',  // use UUID strings or generate
        star: 5,
        postedBy: 'b2222222-2222-2222-2222-222222222222', // user UUID
        productId: 'c3333333-3333-3333-3333-333333333333', // product UUID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Id: '6f258de1-2138-405a-9a4c-ff7ea7cbc3b0',
        star: 3,
        postedBy: 'e5555555-5555-5555-5555-555555555555',
        productId: 'f6666666-6666-6666-6666-666666666666',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // add more sample ratings as needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ratings', null, {});
  }
};