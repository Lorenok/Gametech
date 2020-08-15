'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let marcas = [];
    
      for (let i=0;i<10;i++){
        marcas.push({
          name:faker.company.companyName(),
        })
      }
      return queryInterface.bulkInsert('brands', marcas, {});
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