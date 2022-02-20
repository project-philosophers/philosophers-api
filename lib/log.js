const db = require('../models/index');

// logData: [type, ]
// type: ['philosophers', 'tags', 'users', ]
// data = [date, userId, type, db, ]

// logData = {
//  userId: Int,
// 	DB: String,
// 	action: String,
// 	data_before: JSON,
//  data_after: JSON,
// }


const log = async (logData) => {
	const now = new Date();
	const log = {
		...logData,
		date: now
	};
	// const log = {
	// 	userId: logData.userId,
	// 	DB: logData.DB,
	// 	action: logData.action,
	// 	data_before: logData.data_before,
	// 	data_after: logData.data_after,
	// 	date: now
	// };

	db.Logs
		.create(log)
		.catch(err => console.error(err.stack));
}

module.exports = log;