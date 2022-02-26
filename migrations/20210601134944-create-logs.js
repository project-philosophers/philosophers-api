'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('logs', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dataType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dataName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dataID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_before: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      data_after: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('logs');
  }
};
