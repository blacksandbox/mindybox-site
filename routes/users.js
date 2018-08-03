var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

  //TODO: learn about what "next" does. It allows you to
  //	  can used to add multiple route handlers the path
});

module.exports = router;
