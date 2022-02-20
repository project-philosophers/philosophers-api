'use strict';
const {
  Sequelize, Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Philosophers extends Model {
  }

  Philosophers.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING(8)
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    name_original: {
      type: Sequelize.TEXT
    },
    name_other: {
      type: Sequelize.STRING
    },
    born: {
      type: Sequelize.INTEGER
    },
    born_date: {
      type: Sequelize.DATEONLY
    },
    born_questioning: {
      type: Sequelize.BOOLEAN
    },
    died: {
      type: Sequelize.INTEGER
    },
    died_date: {
      type: Sequelize.DATEONLY
    },
    died_questioning: {
      type: Sequelize.BOOLEAN
    },
    gender: {
      type: Sequelize.ENUM('male', 'female', 'other')
    },
    // language: {
    //   type: Sequelize.ARRAY(Sequelize.STRING),
    //   comment: 'tags'
    // },
    // nationality: {
    //   type: Sequelize.ARRAY(Sequelize.STRING),
    //   comment: 'tags'
    // },
    birthplace: {
      type: Sequelize.STRING
    },
    deathplace: {
      type: Sequelize.STRING
    },
    // education: {
    //   type: Sequelize.ARRAY(Sequelize.STRING),
    //   comment: 'tags'
    // },
    // category: {
    //   type: Sequelize.ARRAY(Sequelize.STRING),
    //   comment: 'tags'
    // },
    // keywords: {
    //   type: Sequelize.ARRAY(Sequelize.STRING),
    //   comment: 'tags'
    // },
    influences: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    influenced: {
      type: Sequelize.ARRAY(Sequelize.STRING)
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
    modelName: 'Philosophers',
    tableName: 'philosophers'
  });

  return Philosophers;
};
