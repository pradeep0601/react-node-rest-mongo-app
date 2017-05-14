// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var employeeSchema = new Schema({
  employeeId: {type: Number, required: true, unique: true},
  name: {type:String, default:''},
  address: { type: String, default:'' },
  email: { type: String, required: true },
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

// the schema is useless so far
// we need to create a model using it
var Employee = mongoose.model('Employee', employeeSchema);

// on every save, add the date
employeeSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});
// make this available to our users in our Node applications
module.exports = Employee;
