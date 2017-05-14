var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET add employee page. */
router.get('/addemployee', function(req, res, next) {
  res.render('addemployee', { title: 'addemployee' });
});

module.exports = router;
