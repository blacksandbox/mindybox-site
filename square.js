// use export object to make information available outside of this module
exports.area = function(width) { return width * width; };
exports.perimeter = function(width) { return 4 * width; };

// var square = require('./square'); 
// Here we require() the name of the file without the (optional) .js file extension


// use module.exports to export a complete object
module.exports = {
  area: function(width) {
    return width * width;
  },
       
  perimeter: function(width) {
    return 4 * width;
  }
};