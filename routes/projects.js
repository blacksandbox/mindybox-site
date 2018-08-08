var express = require('express');
var router = express.Router();
var Project = require('../models/project');

// Example of middleware for all requests
/*
router.use(function(req, res, next) {
    // do logging
    console.log('A non-specified request is made!');
    next();
});
*/


// render template ajaxly
// note: use .route() to handle mutiple routes for same URI
router.route('/test')
	.all(function(req,res,next){
		//this is where your middleware lives
		console.log("Middleware: Ajax request made");
		next(); // don't stop at middleware, go to the next routes

	})
	.get(function(req,res){
		res.json({message: "You made a test get request for Projects!"});

		//you have have to use render() to render your own template
		//res.render();
		//res.end();

	});


module.exports = router;


