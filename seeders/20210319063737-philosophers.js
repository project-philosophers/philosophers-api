'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return await queryInterface.bulkInsert('philosophers', [
{id: "92687501", name: "Descartes", name_original: null, name_other: null, born: 1596, born_date: null, born_questioning: false, died: 1650, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: ["00950212", "43159293", "97056520"], influences: null, createdAt: now, updatedAt: now},
{id: "00950212", name: "Spinoza", name_original: null, name_other: null, born: 1632, born_date: null, born_questioning: false, died: 1677, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: ["97056520", "58540054", "64312836"], influences: ["92687501"], createdAt: now, updatedAt: now},
{id: "43159293", name: "Malbranche", name_original: null, name_other: null, born: 1638, born_date: null, born_questioning: false, died: 1715, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: null, influences: ["92687501"], createdAt: now, updatedAt: now},
{id: "97056520", name: "Leibniz", name_original: null, name_other: null, born: 1646, born_date: null, born_questioning: false, died: 1716, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: ["32889134"], influences: ["92687501", "00950212"], createdAt: now, updatedAt: now},
{id: "33429962", name: "Locke", name_original: null, name_other: null, born: 1632, born_date: null, born_questioning: false, died: 1704, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: ["81277889"], influences: null, createdAt: now, updatedAt: now},
{id: "81277889", name: "Berkeley", name_original: null, name_other: null, born: 1685, born_date: null, born_questioning: false, died: 1753, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: ["43937724"], influences: ["33429962"], createdAt: now, updatedAt: now},
{id: "43937724", name: "Hume", name_original: null, name_other: null, born: 1711, born_date: null, born_questioning: false, died: 1776, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: ["32889134"], influences: ["81277889"], createdAt: now, updatedAt: now},
{id: "32889134", name: "Kant", name_original: null, name_other: null, born: 1724, born_date: null, born_questioning: false, died: 1804, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: ["82260680", "58540054", "64312836"], influences: ["97056520", "43937724"], createdAt: now, updatedAt: now},
{id: "82260680", name: "Fichte", name_original: null, name_other: null, born: 1762, born_date: null, born_questioning: false, died: 1814, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: ["58540054", "64312836"], influences: ["32889134"], createdAt: now, updatedAt: now},
{id: "58540054", name: "Schelling", name_original: null, name_other: null, born: 1775, born_date: null, born_questioning: false, died: 1854, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: null, influences: ["32889134", "82260680"], createdAt: now, updatedAt: now},
{id: "64312836", name: "Hegel", name_original: null, name_other: null, born: 1770, born_date: null, born_questioning: false, died: 1831, died_date: null, died_questioning: false, sex: 'male', birthplace: null, deathplace: null, influenced: null, influences: ["32889134", "82260680"], createdAt: now, updatedAt: now}
], {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('philosophers', null, {});
  }
};
