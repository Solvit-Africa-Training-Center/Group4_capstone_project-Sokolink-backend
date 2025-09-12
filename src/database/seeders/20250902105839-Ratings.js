'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ratings', [
      {
        id: '665cb50f-d015-4d73-937f-2be9cc0b096f',  // use UUID strings or generate
        star: 5,
        postedBy: 'af4357d9-72a9-45d7-a288-4fcfbb59fc9f', // user UUID
        productId: '6f258de1-2138-405a-9a4c-ff7ea7cbc3b0', // product UUID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6f258de1-2138-405a-9a4c-ff7ea7cbc3b0',
        star: 3,
        postedBy: 'acc284e1-c124-4c56-80c3-259d18768d0b',
        productId: 'b795e83e-738a-4fee-a6ae-5887ec4aea83',
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