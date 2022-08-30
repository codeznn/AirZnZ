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
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'It is close to downtown. Quiet and Convenient.',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'The place was beautiful, spacious and clean.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: 'The place was even better than in the picture.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 5,
        review: 'Fantastic host and great location!',
        stars: 5
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Perfect stay! Highly recommend!',
        stars: 4
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null, {});
  }
};
