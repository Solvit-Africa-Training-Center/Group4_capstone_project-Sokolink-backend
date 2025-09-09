'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('profiles', [
      {
        id: uuidv4(),
        userId: 'af4357d9-72a9-45d7-a288-4fcfbb59fc9f', 
        phone: '+250780123456',
        profilePicture: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        bio: 'Tech enthusiast Electrical devices seller.',
        gender: 'male',
        dateOfBirth: new Date('1995-06-15'),
        country: 'Rwanda',
        city: 'Kigali',
        address: 'KG 123 St',
        isVerified: true,
        lastLogin: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: 'acc284e1-c124-4c56-80c3-259d18768d0b',
        phone: '+250780987654',
        profilePicture: 'https://res.cloudinary.com/demo/image/upload/sample2.jpg',
        bio: 'proffessional agricultural products seller.',
        gender: 'female',
        dateOfBirth: new Date('1993-04-22'),
        country: 'Rwanda',
        city: 'Musanze',
        address: 'MR 45 Ave',
        isVerified: false,
        lastLogin: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('profiles', null, {});
  },
};
