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
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'https://herebnb-seeds.s3.amazonaws.com/living7.jpg'
      },
      {
        reviewId: 2,
        url: 'https://herebnb-seeds.s3.amazonaws.com/living8.jpg'
      },
      {
        reviewId: 3,
        url: 'https://herebnb-seeds.s3.amazonaws.com/bedroom9.jpg'
      },
      {
        reviewId: 4,
        url: 'https://herebnb-seeds.s3.amazonaws.com/living10.jpg'
      },
      {
        reviewId: 5,
        url: 'https://herebnb-seeds.s3.amazonaws.com/bedroom10.jpg'
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
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
