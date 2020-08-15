'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let categorias = [];
    
      for (let i=0;i<10;i++){
        categorias.push({
          name:faker.company.catchPhraseAdjective(),
        })
      }
      return queryInterface.bulkInsert('categories', categorias, {});
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