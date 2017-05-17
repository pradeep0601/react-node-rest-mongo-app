// grab the things we need
var express = require('express');
var router = express.Router();

var EmployeeController = require('../controllers/EmployeeController');

router.get('/:resource', function(req, res, next){
var resource = req.params.resource;
  console.log('api:get(): request recieved for resource: '+resource);
  EmployeeController.getAllEmployee(req.query, function(err, results){
    if(err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'Success',
      results: results
    });
  });
});

router.post('/:resource', function(req, res, next){
  var resource = req.params.resource;
  console.log('api:post(): request recieved for resource: '+resource);
  EmployeeController.saveEmployee(req.body, function(err, results){
    if(err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    }
    console.log('api:post(): successful with response: '+ JSON.stringify(results));
    res.json({
      confirmation: 'Success',
      results: results
    });
  });
});
router.put('/:resource', function(req, res, next){
  var resource = req.params.resource;
  console.log('api:put(): request recieved for resource: '+resource);
  EmployeeController.updateEmployee(req.body, function(err, results){
    if(err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    }
    console.log('api:put(): successful with response: '+ JSON.stringify(results));
    res.json({
      confirmation: 'Success',
      results: results
    });
  });
});
router.delete('/:resource/:employeeId', function(req, res, next){
  var employeeId = req.params.employeeId;
  console.log('api:delete(): request recieved for employeeId: '+employeeId);
  EmployeeController.deleteEmployee(employeeId, function(err, results){
    if(err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    }
  res.json({
      confirmation: 'Success',
      results: results
    });
  });
});

module.exports = router;
