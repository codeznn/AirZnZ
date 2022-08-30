'use strict';

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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://herebnb-seeds.s3.amazonaws.com/living6.jpg',
        preview: true
      },
      {
        spotId: 2,
        url:'https://herebnb-seeds.s3.amazonaws.com/dining4.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://herebnb-seeds.s3.amazonaws.com/living3.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://herebnb-seeds.s3.amazonaws.com/living2.jpg',
        preview: true
      },
      {
        spotId: 5,
        url:'https://herebnb-seeds.s3.amazonaws.com/dining10.jpg',
        preview: true
      }
    ])



  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
