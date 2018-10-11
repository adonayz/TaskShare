var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pending', {
      title: 'Pending',
      name: 'Pending Tasks'
  });
});

module.exports = router;
