'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let producto = [];
    
      for (let i=0;i<10;i++){
        producto.push({
          price:faker.commerce.price(),
          short_description:faker.commerce.productName(),
          long_description:faker.random.words(10),
          image: faker.image.transport(),
        })
      }
      return queryInterface.bulkInsert('products', producto, {});
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