var express = require('express');
var router = express.Router();

const db = require('../../models/index');

const log = require('../../lib/log');


// check logged in
router.get('/', (req, res) => {
  if (!req.session.userinfo) {
  	res.redirect('/main');
  }
});


// create
// req: req.body.data = { userinfo: userinfo, ph: ph }
// res: status
router.post('/create', (req, res, next) => {
  const userinfo = req.session.userinfo;
  if (!userinfo) {
  	console.log("not login");
		throw new Error("not login");
  }
	next();
}, (req, res) => {

	const ph = req.body.ph;

	// let id = Math.random().toString().substring(2, 8);

	const generateId = require('../../lib/generateId');
	const id = generateId();
	console.log("id:" + id);


	const createPhilosopher = async () => {
		db.Philosophers.create({
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
	};

	// const updateTags = async (id) => {
	// 	await TagsController.updateTagLanguages(id, ph.languages.map(ts => ts.id));
	// 	await TagsController.updateTagNationalities(id, ph.nationalities.map(ts => ts.id));
	// 	await TagsController.updateTagEducation(id, ph.education.map(ts => ts.id));
	// 	await TagsController.updateTagCategories(id, ph.categories.map(ts => ts.id));
	// 	await TagsController.updateTagKeywords(id, ph.keywords.map(ts => ts.id));
	// };

	createPhilosopher()
		// .then(() => updateTags(id))
		.then(() => {
			const logData = {
				userId: userinfo.id,
				DB: "philosophers",
				action: "create",
				data_before: null,
				data_after: JSON.stringify(ph)
			};
			log(logData);
		})
		.then(() => res.json('created'))
		.catch(err => console.error(err.stack));
});


// read
// req: null
// res: [phils]
router.get('/read', (req, res) => {
  db.Philosophers.findAll({
    include: [
    //   { model: db.Languages, as: "languages" },
    //   { model: db.Nationalities, as: "nationalities" },
    //   { model: db.Education, as: "education" },
    //   { model: db.Categories, as: "categories" },
    //   { model: db.Keywords, as: "keywords" }
    ]
  })
    .then(phils => {
			const resJson = {
				'data': phils.map(ph => ph.dataValues)
			};
			res.json(resJson);
		})
		.catch(err => console.error(err.stack));
});


// update
// req: req.body.data = { userinfo: userinfo, ph: ph }
// res: status
router.post('/update', (req, res, next) => {
	const userinfo = req.session.userinfo;
  if (!userinfo) {
  	console.log("not login");
		throw new Error("not login");
  }
	next();
}, (req, res) => {
	const ph = req.body.ph;

	// const findBeforePh = () => {
	// db.Philosophers
	// .findOne({where: {id: ph.id}})
	// .then(ph => ph)
	// };

	const updatePhilosophers = () => {
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
		{where: {id: ph.id}}
		)
		.catch(err => console.error(err.stack));
	};

	// const updateTags = async () => {
	// 	await TagsController.updateTagLanguages(ph.id, ph.languages.map(ts => ts.id));
	// 	await TagsController.updateTagNationalities(ph.id, ph.nationalities.map(ts => ts.id));
	// 	await TagsController.updateTagEducation(ph.id, ph.education.map(ts => ts.id));
	// 	await TagsController.updateTagCategories(ph.id, ph.categories.map(ts => ts.id));
	// 	await TagsController.updateTagKeywords(ph.id, ph.keywords.map(ts => ts.id));
	// };

	// const updateFuncs = [updatePhilosophers(), updateTags()];

	const ph_before = db.Philosophers
		.findOne({where: {id: ph.id}})
		.catch(err => console.error(err.stack));

	updatePhilosophers()
		.then(() => {
			const logData = {
				userId: userinfo.id,
				DB: "philosophers",
				action: "update",
				data_before: JSON.stringify(ph_before),
				data_after: JSON.stringify(ph)
			};
			log(logData);
		})
		.then(() => res.json('updated'))
		.catch(err => console.error(err.stack));
	// db.Philosophers
	// 	.findOne({where: {id: ph.id}})
	// 	.then(oldPh => {
	// Promise
	// 	.all(updateFuncs)
	// 	.then(() => {
	// 		const logData = {
	// 			userId: userinfo.userId,
	// 			DB: "philosophers",
	// 			action: "update",
	// 			data_before: JSON.stringify(oldPh),
	// 			data_after: JSON.stringify(ph)
	// 		};
	// 		db.Logs.create(log)
	// 		.catch(err => console.error(err.stack));

	// 		res.end();
	// 	})
	// 	.catch(err => console.error(err.stack));
	// 	});
});


// delete
// req: [userinfo, ph.id]
// res: status
router.post('/delete', (req, res, next) => {
	const userinfo = req.session.userinfo;
  if (!userinfo) {
  	console.log("not login");
		throw new Error("not login");
  }
	next();
}, (req, res) => {
	const ph_before = req.body.ph;
	db.Philosophers
		.destroy({
			where: {
				id: [ph.id]
			}
		})
		.then(() => {
			const log = {
				userId: userinfo.id,
				DB: "philosophers",
				action: "delete",
				data_before: JSON.stringify(ph_before),
				data_after: null
			};
			log(logData);
		})
		.then(() => res.json('deleted'))
		.catch(err => console.error(err.stack));
});


module.exports = router;