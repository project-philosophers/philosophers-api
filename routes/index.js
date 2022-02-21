var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/post', (req, res) => {
  console.log('ok');
  res.send('hello, ' + req.body.name);
})


const philsContoroller = require(('./model_routers/philosophers'));
router.use('/philosophers', philsContoroller);


module.exports = router;
