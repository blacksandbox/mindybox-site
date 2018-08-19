var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    title               	 : {type: String, required: true},
    role               	 	 : [String],
    short_description   	 : {type: String, required: true},
    challenge_description    : {type: String},
    template				 : {type: String}

});

// project model's url
projectSchema
.virtual('url')
.get(function () {
  return '/project/' + this._id;
});

//create "project" model class

module.exports = mongoose.model('Project', projectSchema );



