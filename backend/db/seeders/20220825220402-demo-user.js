'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'First',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Tina',
        lastName: 'Wu',
        email: 'tinawu@mybnb.com',
        username: 'tinawu',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'David',
        lastName: 'Song',
        email: 'davidsong@mybnb.com',
        username: 'davidsong',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Gary',
        lastName: 'White',
        email: 'garywhite@mybnb.com',
        username: 'garywhite',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Noah',
        lastName: 'Park',
        email: 'noahpark@mybnb.com',
        username: 'noahpark',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['sarayang', 'tinawu', 'davidsong', 'garywhite', 'noahpark' ] }
    }, {});
  }
};
