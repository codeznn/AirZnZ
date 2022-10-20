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
        review: 'A peaceful getaway among the trees. We had a great time and loved that you could not see any neighboring homes, just trees and trees. ',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'A beautiful gem of a location tucked into the coastal redwoods in Sea Ranch.',
        stars: 4
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Great place to getaway and relax. The cabin is beautifully designed and has everything you need.',
        stars: 4
      },
      {
        spotId: 1,
        userId: 5,
        review: 'The house was absolutely amazing and was perfect for our family gathering.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Fantastic home and host, thank you for a great weekend!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'A dream escape. Hard to put in to words this heavenly place.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Great home and great hospitality! Absolutely stunning property.',
        stars: 5
      },
      {
        spotId: 5,
        userId: 1,
        review: 'It was awesome, above our expectations.',
        stars: 4
      },
      {
        spotId: 6,
        userId: 3,
        review: 'It is close to downtown. Quiet and Convenient.',
        stars: 4
      },
      {
        spotId: 7,
        userId: 4,
        review: 'A beautiful spacious property. This was the best location for our event.',
        stars: 1
      },
      {
        spotId: 8,
        userId: 1,
        review: 'Great host and amazing place to stay.',
        stars: 4
      },
      {
        spotId: 9,
        userId: 1,
        review: 'Amazing place. Very spacious and just stunning.',
        stars: 5
      },
      {
        spotId: 10,
        userId: 1,
        review: 'Comfortable sleeping for about 8 people but beyond that you have to plan on roughing it out.',
        stars: 4
      },
      {
        spotId: 11,
        userId: 3,
        review: 'This is a very beautiful home where you can have a relaxing and fun vacation while enjoying some privacy. ',
        stars: 4
      },
      {
        spotId: 12,
        userId: 4,
        review: 'The place was beautiful, spacious and clean.',
        stars: 5
      },
      {
        spotId: 13,
        userId: 5,
        review: 'The place was even better than in the picture.',
        stars: 4
      },
      {
        spotId: 14,
        userId: 2,
        review: 'Fantastic host and great location!',
        stars: 5
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
