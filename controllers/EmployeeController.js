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
      console.log("EmployeeController: saveEmployee(-): EMPLOYEE saved successfuly!! employee = "+employee);
    });
  },

  updateEmployee: function(params, callback){
    console.log('EmployeeController: updateEmployee(-): params = '+JSON.stringify(params));
    var query = {created_at:params.created_at};
    Employee.findOneAndUpdate(query, params, function(err, employee){
      if(err){
        console.log("EmployeeController: updateEmployee(-): ERROR while retrieving employee");
        callback(err, null);
        return;
      }
      callback(null, employee);
      console.log("EmployeeController: updateEmployee(-): EMPLOYEE updated successfuly!!");
    });
  },

  deleteEmployee: function(employeeId, callback){
    console.log('EmployeeController: deleteEmployee(-) params'+JSON.stringify(employeeId));
    //get the employee with given employeeId and delete it
    console.log("employeeId "+employeeId);
    var query = {employeeId:employeeId}
    Employee.findOneAndRemove(query, function(err, response){
      if(err){
        console.log("EmployeeController: deleteEmployee(-): ERROR while retrieving employee with employeeId: "+employeeId);
          callback(err, null);
          return;
      }
       callback(null, response);
        console.log("EmployeeController: deleteEmployee(-): Employee got deleted successfully with response: "+JSON.stringify(response));

    });
  }
}
