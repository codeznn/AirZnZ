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
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-01-01',
        endDate: '2022-01-03',
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2022-02-01',
        endDate: '2022-02-03',
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2022-03-03',
        endDate: '2022-03-06',
      },
      {
        spotId: 4,
        userId: 5,
        startDate: '2022-06-06',
        endDate: '2022-06-08',
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2022-08-08',
        endDate: '2022-08-10',
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
    await queryInterface.bulkDelete('Bookings', null, {});
  }

};
