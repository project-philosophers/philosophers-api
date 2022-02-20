const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const session = require('express-session');
const { check, validationResult } = require('express-validator');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const db = require('../models/index');

const errorRes = require('../lib/errorRes');


// userpage
router.get('/', (req, res) => {
  // console.log(req.session.username);
  console.log(req.cookies.username);
  // if logged in
  if (req.session.username) {
    console.log(req.session.username);
    res.render('index', { title: 'hello' });
  } else {
    res.redirect('/users/login');
  }
});

// register {name, email, password, password_confirm}
router.post('/register', [
  check('name').not().isEmpty().isAlphanumeric().isLength({min:5, max:50}),
  check('email').not().isEmpty().isEmail().custom((value, { req }) => {
    return db.Users.count({ where: { email: req.body.email } })
    .then(count => {
      if (count > 0) {
        throw new Error('already in use');
      }
    })
  }),
  check('password').not().isEmpty().isHash('sha256').custom((value, { req }) => {
    if (req.body.password !== req.body.password_confirm) {
      throw new Error('no');
    }
    return true;
  })
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // email send

  const userdata = {
    'name': req.body.name,
    'email': req.body.email,
    'password': req.body.password
  };
  db.Users.create(userdata)
  .then(() => res.json({ result: true }))
  .catch(err => console.error(err.stack));
});


// login {email, password}

// router.get('/login', (req, res) => {
//   res.render('index', { title: 'login' });
// })

router.post('/login', [
  check('email').not().isEmpty().isEmail(),
  check('password').not().isEmpty().isHash('sha256')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  db.Users.findOne({ where: { email: req.body.email } })
  .then(user => {
    // unregistered email 
    if (!user) {
      throw new Error('this email is not registered');
    }
    // incorrect password
    if (req.body.password !== user.dataValues.password) {
      throw new Error('password is incorrect');
    }
    
    const username = user.dataValues.name;
    req.session.regenerate(err => {
      req.session.username = username;
      req.session.save();
      res.render('index', { title: req.session.username });
      // console.log(req.session);
      // res.redirect('/users/p');
    });

  })
  .catch(err => {
    console.error(err.stack);
    // const 
    res.status(401).send(err.message);
  });
});


// logout
router.get('/logout', function(req, res, next) {
  const username = req.session.username;
  console.log(req.session);
  res.render('index', { title: username });
});


module.exports = router;