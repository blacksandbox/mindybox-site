var express = require('express');
var pug = require('pug');
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


// to see DB connection setting, see app.js

// for Project object setting, see models/project.js



// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Api request recieved.');
    next(); // make sure we go to the next routes and don't stop here
});



// render template ajaxly
// note: use .route() to handle mutiple routes for same URI
router.route('/projects/:project_id')

    .get(function(req, res) {
        Project.findById(req.params.project_id)
        	.exec(function(err, project_obj) {
            if (err){ 
                res.send(err);
                // I don't need to return?
            }
			
			var resJson = {};
			
			// hasOwnProperty always returns false for some reason
			// console.log(project_obj.hasOwnProperty('_id')); // false

			resJson['_id'] = project_obj._id === undefined ? false : project_obj._id;
			resJson['template_url'] = project_obj.url === undefined ? false : project_obj.url;

			resJson['html'] = '';
			if (resJson.template_url){
				try {
					var renderFn = pug.compileFile(resJson.template_url);
					resJson['html'] = renderFn({id: resJson._id, title: project_obj.title});
				}
				catch (err){
					if (err.code == 'ENOENT'){
						resJson['html'] = "Could not find project's template at '" + resJson.template_url + "'";
					} else {
						resJson['html'] = "Sorry, something went wrong when retrieving template :(";
					}
				}
			} 

            res.json(resJson);
        });
    });


router.route('/projects')
	.get(function(req, res) {
	    Project.find({})
	        .exec( function(err, all_projects) {
	            if (err){
	                res.send(err);
	            }
	            res.json(all_projects);
	        });

	    });


module.exports = router;


