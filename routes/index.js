var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  	{
  	 	title: 'Express' 
  	});
});

// Example with a controller
/*
// Require controller modules.
var book_controller = require('../controllers/bookController');

// GET catalog home page.
router.get('/', book_controller.index);
// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', book_controller.book_create_get);
router.post('/book/create', book_controller.book_create_post);
router.get('/book/:id/delete', book_controller.book_delete_get);
router.post('/book/:id/delete', book_controller.book_delete_post);
*/

module.exports = router;
