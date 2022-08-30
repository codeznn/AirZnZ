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
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "65 E 55th St",
        city: "San Francisco",
        state: "CA",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Aya",
        description: "Apartment near Union Square",
        price: 123.321
      },
      {
        ownerId: 2,
        address: "99 E 66th St",
        city: "New York",
        state: "NY",
        country: "United States",
        lat: 40.7645358,
        lng: -73.4730327,
        name: "Avaron",
        description: "Amazing Victorian House",
        price: 333.333
      },
      {
        ownerId: 3,
        address: "55 E 33th St",
        city: "New York",
        state: "NY",
        country: "United States",
        lat: 40.7306100,
        lng: -73.9352421,
        name: "Redwood Palace",
        description: "Dreaming apartment",
        price: 222.222
      },
      {
        ownerId: 4,
        address: "66 E 11th St",
        city: "San Francisco",
        state: "CA",
        country: "United States",
        lat: 36.7645358,
        lng: -133.4730327,
        name: "The Vale",
        description: "Enjoy living in this airy",
        price: 221.222
      },
      {
        ownerId: 5,
        address: "32 E 12th St",
        city: "Los Angeles",
        state: "CA",
        country: "United States",
        lat: 34.7645358,
        lng: -118.4730327,
        name: "Nexues",
        description: "Style. Simplicity. Serenity.",
        price: 122.222
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
    await queryInterface.bulkDelete('Spots', {
      city: { [Op.in]: ['San Fancisco', 'Los Angeles', 'New York']}
    })
  }
};
