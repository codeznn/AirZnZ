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
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s1-4.webp'
      },
      {
        reviewId: 2,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s2-4.webp'
      },
      {
        reviewId: 3,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s3-4.webp'
      },
      {
        reviewId: 4,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s4-4.webp'
      },
      {
        reviewId: 5,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s5-4.webp'
      },
      {
        reviewId: 6,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s6-4.webp'
      },
      {
        reviewId: 7,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s7-4.webp'
      },
      {
        reviewId: 8,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s8-4.webp'
      },
      {
        reviewId: 9,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s9-4.webp'
      },
      {
        reviewId: 10,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s10-4.webp'
      },
      {
        reviewId: 11,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s11-4.webp'
      },
      {
        reviewId: 12,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s12-4.webp'
      },
      {
        reviewId: 13,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s13-4.webp'
      },
      {
        reviewId: 14,
        url: 'https://airbnb-pictures.s3.us-west-1.amazonaws.com/airbnb-pictures/s14-4.webp'
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
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
