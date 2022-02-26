'use strict';
const {
  Sequelize, Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Nationalities extends Model {
  }

  Nationalities.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'Nationalities',
    tableName: 'nationalities'
  });

  return Nationalities;
};
