var express = require('express');
var router = express.Router();

const db = require('../../models/index');

const log = require('../../lib/log');


// authentification
const authUser = (req, res, next) => {
	// const userinfo = req.session.userinfo;
  // if (!userinfo) {
  // 	console.log("not login");
	// 	throw new Error("not login");
  // }
	next();
}



// create
// req: req.body.data = { userinfo: userinfo, ph: ph }
// res: status
const createPh = async (req, res, next) => {
	const generateId = require('../../lib/generateId');
	const id = await generateId();

	const ph = req.body.ph;

	db.Philosophers
		.create({
			id: id, 
			name: ph.name,
			name_original: ph.name_original,
			name_other: ph.name_other,
			born: ph.born,
			born_date: ph.born_date,
			born_questioning: ph.born_questioning,
			died: ph.died,
			died_date: ph.died_date,
			died_questioning: ph.died_questioning,
			gender: ph.gender,
			birthplace: ph.birthplace,
			deathplace: ph.deathplace,
		})
		.catch(err => console.error(err.stack));

	next();
}

router.post('/create',
	authUser,
	createPh,
	(req, res, next) => {
		const logData = {
			userId: userinfo.id,
			DB: "philosophers",
			action: "create",
			data_before: null,
			data_after: JSON.stringify(ph)
		};
		log(logData);
		next();
	},
	(req, res) => {
		res.json('created');
	}
);


// 	// const updateTags = async (id) => {
// 	// 	await TagsController.updateTagLanguages(id, ph.languages.map(ts => ts.id));
// 	// 	await TagsController.updateTagNationalities(id, ph.nationalities.map(ts => ts.id));
// 	// 	await TagsController.updateTagEducation(id, ph.education.map(ts => ts.id));
// 	// 	await TagsController.updateTagCategories(id, ph.categories.map(ts => ts.id));
// 	// 	await TagsController.updateTagKeywords(id, ph.keywords.map(ts => ts.id));
// 	// };



// read
// req: null
// res: [phils]
const readPhils = async (req, res, next) => {
	const phils = await db.Philosophers.findAll({
    // include: [
    //   { model: db.Languages, as: "languages" },
    //   { model: db.Nationalities, as: "nationalities" },
    //   { model: db.Education, as: "education" },
    //   { model: db.Categories, as: "categories" },
    //   { model: db.Keywords, as: "keywords" }
    // ]
  })
		.catch(err => console.error(err.stack));

	res.locals.phils = phils;
	next();
}

router.get('/read',
	readPhils,
	(req, res) => {
		const phils = res.locals.phils;
		const resJson = {
			'data': phils.map(ph => ph.dataValues)
		};
		res.json(resJson);
	});



// update
// req: req.body.data = { userinfo: userinfo, ph: ph }
// res: status
const findPh = async (req, res, next) => {
	const id = req.body.ph.id;
	const ph_old = await db.Philosophers
		.findOne({ where: { id: id } })
		.catch(err => console.error(err.stack));

	res.locals.ph_old = ph_old;
	next();
}
const updatePh = (req, res, next) => {
	const ph = req.body.ph;

	db.Philosophers
		.update({
			name: ph.name,
			name_original: ph.name_original,
			name_other: ph.name_other,
			born: ph.born,
			born_date: ph.born_date,
			born_questioning: ph.born_questioning,
			died: ph.died,
			died_date: ph.died_date,
			died_questioning: ph.died_questioning,
			gender: ph.gender,
			birthplace: ph.birthplace,
			deathplace: ph.deathplace,
		},
		{ where: { id: ph.id } }
		)
		.catch(err => console.error(err.stack));

	res.locals.ph_new = ph;
	next();
}

router.post('/update',
	authUser,
	findPh,
	updatePh,
	// (req, res, next) => {
	// 	const logData = {
	// 		userId: userinfo.id,
	// 		DB: "philosophers",
	// 		action: "update",
	// 		data_before: JSON.stringify(res.locals.ph_old),
	// 		data_after: JSON.stringify(res.locals.ph_new)
	// 	};
	// 	log(logData);
	// 	next();
	// },
	(req, res) => {
		res.json('updated');
	}
);

// router.post('/update', (req, res, next) => {
// 	const userinfo = req.session.userinfo;
//   if (!userinfo) {
//   	console.log("not login");
// 		throw new Error("not login");
//   }
// 	next();
// }, (req, res) => {
// 	const ph = req.body.ph;

// 	// const findBeforePh = () => {
// 	// db.Philosophers
// 	// .findOne({where: {id: ph.id}})
// 	// .then(ph => ph)
// 	// };

// 	const updatePhilosophers = () => {
// 		db.Philosophers
// 			.update({
// 				name: ph.name,
// 				name_original: ph.name_original,
// 				name_other: ph.name_other,
// 				born: ph.born,
// 				born_date: ph.born_date,
// 				born_questioning: ph.born_questioning,
// 				died: ph.died,
// 				died_date: ph.died_date,
// 				died_questioning: ph.died_questioning,
// 				gender: ph.gender,
// 				birthplace: ph.birthplace,
// 				deathplace: ph.deathplace,
// 			},
// 			{where: {id: ph.id}}
// 			)
// 			.catch(err => console.error(err.stack));
// 		};

// 	// const updateTags = async () => {
// 	// 	await TagsController.updateTagLanguages(ph.id, ph.languages.map(ts => ts.id));
// 	// 	await TagsController.updateTagNationalities(ph.id, ph.nationalities.map(ts => ts.id));
// 	// 	await TagsController.updateTagEducation(ph.id, ph.education.map(ts => ts.id));
// 	// 	await TagsController.updateTagCategories(ph.id, ph.categories.map(ts => ts.id));
// 	// 	await TagsController.updateTagKeywords(ph.id, ph.keywords.map(ts => ts.id));
// 	// };

// 	// const updateFuncs = [updatePhilosophers(), updateTags()];

// 	const ph_before = db.Philosophers
// 		.findOne({where: {id: ph.id}})
// 		.catch(err => console.error(err.stack));

// 	updatePhilosophers()
// 		.then(() => {
// 			const logData = {
// 				userId: userinfo.id,
// 				DB: "philosophers",
// 				action: "update",
// 				data_before: JSON.stringify(ph_before),
// 				data_after: JSON.stringify(ph)
// 			};
// 			log(logData);
// 		})
// 		.then(() => res.json('updated'))
// 		.catch(err => console.error(err.stack));
// 	// db.Philosophers
// 	// 	.findOne({where: {id: ph.id}})
// 	// 	.then(oldPh => {
// 	// Promise
// 	// 	.all(updateFuncs)
// 	// 	.then(() => {
// 	// 		const logData = {
// 	// 			userId: userinfo.userId,
// 	// 			DB: "philosophers",
// 	// 			action: "update",
// 	// 			data_before: JSON.stringify(oldPh),
// 	// 			data_after: JSON.stringify(ph)
// 	// 		};
// 	// 		db.Logs.create(log)
// 	// 		.catch(err => console.error(err.stack));

// 	// 		res.end();
// 	// 	})
// 	// 	.catch(err => console.error(err.stack));
// 	// 	});
// });


// delete
// req: [userinfo, ph.id]
// res: status
const deletePh = (req, res, next) => {
	const ph_old = req.body.ph;
	db.Philosophers
		.destroy({ where: { id: ph_old.id } })
		.catch(err => console.error(err.stack));
	
	res.locals.ph_old = ph_old;
	next();
}

router.post('/delete',
	authUser,
	deletePh,
	// (req, res, next) => {
	// 	const logData = {
	// 		userId: userinfo.id,
	// 		DB: "philosophers",
	// 		action: "delete",
	// 		data_before: JSON.stringify(res.locals.ph_old),
	// 		data_after: null
	// 	};
	// 	log(logData);
	// 	next();
	// },
	(req, res) => {
		res.json('deleted');
	}
);



module.exports = router;