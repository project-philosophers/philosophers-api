const generateId = () => {
	while (true) {
		let id_temp = Math.random().toString().substring(2, 6);
		db.Philosophers
			.count({where: {id: [id_temp]}})
			.then(count => {
					if (count === 0) {
							return id_temp;
					}
			});
	}
};

module.exports = generateId;