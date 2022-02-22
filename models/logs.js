'use strict';
const {
  Sequelize, Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
  }

  Logs.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    DB: {
      allowNull: false,
      type: Sequelize.STRING
    },
    action: {
      allowNull: false,
      type: Sequelize.STRING
    },
    data_before: {
			allowNull: false,
			type: Sequelize.STRING
    },
		data_after: {
			allowNull: false,
			type: Sequelize.STRING
    },
    date: {
      allowNull: false,
      type: Sequelize.DATE
    },
  }, {
    sequelize,
    modelName: 'Logs',
    tableName: 'logs'
  });

  return Logs;
};
