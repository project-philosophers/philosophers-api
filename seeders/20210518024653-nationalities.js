'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert('nationalities', [
{id: 1, name: "Germany", createdAt: now, updatedAt: now},
{id: 2, name: "UK", createdAt: now, updatedAt: now},
{id: 3, name: "France", createdAt: now, updatedAt: now}
], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('nationalities', null, {});
  }
};
