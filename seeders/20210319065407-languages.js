'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert('languages', [
{id: 1, name: "Greek", createdAt: now, updatedAt: now},
{id: 2, name: "Latin", createdAt: now, updatedAt: now},
{id: 3, name: "French", createdAt: now, updatedAt: now},
{id: 4, name: "German", createdAt: now, updatedAt: now},
{id: 5, name: "English", createdAt: now, updatedAt: now}
], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('languages', null, {});
  }
};
