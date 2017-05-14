//grab the Employee model
var Employee = require('../models/Employee');

//define crud operation

module.exports = {
  getAllEmployee: function(params, callback){
    console.log('EmployeeController: getAllEmployee()');
    Employee.find(params, function(err, employees){
      if(err){
        console.log("EmployeeController: getAllEmployee(-): ERROR while getting employee");
        callback(err, null);
        return;
      }
      callback(null, employees);
      console.log("EmployeeController: getAllEmployee(-): EMPLOYEE retrieved successfuly!!");
    });
  },
  
  saveEmployee: function(params, callback){
    console.log('EmployeeController: saveEmployee(-)');
    Employee.create(params, function(err, employee){
      if(err){
        console.log("EmployeeController: saveEmployee(-): ERROR while saving employee");
        callback(err, null);
        return;
      }
      callback(null, employee);
      console.log("EmployeeController: saveEmployee(-): EMPLOYEE saved successfuly!!");
    });
  }
}
