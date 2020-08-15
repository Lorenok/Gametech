'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let direccion = [];
    
      for (let i=0;i<1000;i++){
        direccion.push({
          street: faker.address.streetName(),
          number:faker.random.number(),
          zipcode:faker.address.zipCode(),
        })
      }
      return queryInterface.bulkInsert('addresses', direccion, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
