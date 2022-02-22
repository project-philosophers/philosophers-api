const db = require('../models/index');

const generateId = async () => {
	let id_temp;
	let v = true;
	// while (v) {
		id_temp = Math.random().toString().substring(2, 10);
		// await db.Philosophers
		// 	.count({where: {id: [id_temp]}})
		// 	.then(count => {v = !(count === 0)});
	// }
	return id_temp;
};

module.exports = generateId;