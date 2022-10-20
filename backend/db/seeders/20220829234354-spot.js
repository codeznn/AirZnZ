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
        state: "California",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Clean & Modern Silicon Valley 1BR/1BA",
        description: "From the private entry gate, to the spectacular views, Casa Bienvenidos will not disappoint you.",
        price: 360
      },
      {
        ownerId: 2,
        address: "99 E 66th St",
        city: "Palo Alto",
        state: "California",
        country: "United States",
        lat: 40.7645358,
        lng: -73.4730327,
        name: "Villa Nel Bosco",
        description: "A beautiful southwestern adobe villa that has unique, custom, artistic touches in every space.",
        price: 420
      },
      {
        ownerId: 3,
        address: "55 E 33th St",
        city: "Cupertino",
        state: "California",
        country: "United States",
        lat: 40.7306100,
        lng: -73.9352421,
        name: "Redwood Palace",
        description: "Relax and unwind in wine country by the pool,  bocce court and gardens.",
        price: 280
      },
      {
        ownerId: 4,
        address: "66 E 11th St",
        city: "San Mateo",
        state: "California",
        country: "United States",
        lat: 36.7645358,
        lng: -133.4730327,
        name: "Spacious & Luxurious 1 Bedroom w/Pool & Parking",
        description: "Designed for modern business and leisure travelers seeking an alternative to traditional accommodations",
        price: 390
      },
      {
        ownerId: 5,
        address: "32 E 12th St",
        city: "Los Angeles",
        state: "California",
        country: "United States",
        lat: 34.7645358,
        lng: -118.4730327,
        name: "Luxury Wine Country Retreat",
        description: "This is for a quiet retreat to enjoy a peaceful environment with nature walks outside your door.  ",
        price: 510
      },
      {
        ownerId: 1,
        address: "00 E 55th St",
        city: "Santa Cruze",
        state: "California",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "3BR Private House with Gorgeous Gardens Near Beach",
        description: "Enjoy your meals on our spacious patio, swim in our pool or relax in our hot tub all while surrounded by beautiful gardens and nature.",
        price: 680
      },
      {
        ownerId: 2,
        address: "01 E 66th St",
        city: "Sonoma",
        state: "California",
        country: "United States",
        lat: 40.7645358,
        lng: -73.4730327,
        name: "Sonoma Vineyard Estate, Pool, Spa, Bikes",
        description: "Stay on a working vineyard in the heart of Sonoma with a breathtaking infinity pool and five acres of privacy.",
        price: 720
      },
      {
        ownerId: 3,
        address: "02 E 33th St",
        city: "Salinas",
        state: "California",
        country: "United States",
        lat: 40.7306100,
        lng: -73.9352421,
        name: "Hacienda House on Vineyard - Pool, Hot Tub & Sauna",
        description: "Retreat to this beautiful 20 acre Hacienda set on a boutique organic vineyard and olive orchard  in the Pastures of Heaven.",
        price: 998
      },
      {
        ownerId: 4,
        address: "03 E 11th St",
        city: "Napa",
        state: "California",
        country: "United States",
        lat: 36.7645358,
        lng: -133.4730327,
        name: "White House Napa Valley Inn",
        description: "From one of the nicer resorts in Napa Valley, we have a spacious 1-bedroom with King bed, living room, a full kitchen with dining table and lots of amenities.",
        price: 880
      },
      {
        ownerId: 5,
        address: "04 E 12th St",
        city: "Livermore",
        state: "California",
        country: "United States",
        lat: 34.7645358,
        lng: -118.4730327,
        name: "Brand new home with inspiring views welcomes you!",
        description: "It’s a brand new community built by Sage. In the community, we have pools, jacuzzis, bbq areas, a playground, a gym, and so much more.",
        price: 690
      },
      {
        ownerId: 1,
        address: "05 E 55th St",
        city: "Los Gatos",
        state: "California",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Los Gatos Oasis",
        description: "Welcome to this fully furnished apartment (900 sq ft) in Los Gatos. ",
        price: 830
      },
      {
        ownerId: 1,
        address: "06 E 55th St",
        city: "Foster City",
        state: "California",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Room on the Lagoon",
        description: "Complex amenities include pool with BBQ, fire pit, sauna, gym, game room, and TV.",
        price: 530
      },
      {
        ownerId: 1,
        address: "07 E 55th St",
        city: "San Jose",
        state: "California",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "888 New Cupertino/Saratoga Luxury Apartment Home",
        description: "Access to the pool and laundry room is included. The Brand new remodel includes hard wood floor, Granite kitchen counter, Stainless Steel appliances, Luxury Bath.",
        price: 830
      },
      {
        ownerId: 1,
        address: "08 E 55th St",
        city: "Joshua Tree",
        state: "California",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "'Desert Wild' Joshua Tree, Pool and Hot Tub",
        description: "Desert Wild is a place to unwind, relax and enjoy the slow pace of the desert.",
        price: 830
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
    await queryInterface.bulkDelete('Spots',null, {})
  }
};
