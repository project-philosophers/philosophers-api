'use strict';
const {
  Sequelize, Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
  }

  Categories.init({
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
    modelName: 'Categories',
    tableName: 'categories'
  });

  return Categories;
};
