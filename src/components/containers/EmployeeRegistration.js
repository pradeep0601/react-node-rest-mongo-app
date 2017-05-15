import React from 'react';
import superagent from 'superagent';

class EmployeeRegistration extends React.Component{
  constructor(){
    super();
    console.log("EmployeeRegistration:constructor()");
    this.state = {
      employee:{
        name:'',
        employeeId: '',
        email: '',
        address: ''
      },
      employees:[
      /*  {_id: 1, name: 'Pradeep', employeeId: 38860, email: 'pradeep@gmail.com', address: 'Gurgaon'},
        {_id: 2, name: 'Susil', employeeId: 38861, email: 'susil@gmail.com', address: 'Orissa'},
        {_id: 3, name: 'Saurav', employeeId: 38862, email: 'saurav@gmail.com', address: 'Lucknow'}*/
      ]
    }

  }

componentDidMount(){
  console.log("EmployeeRegistration:componentDidMount()");
  superagent
  .get('/api/employee')
  .query(null)
  .set('Accept', 'application/json')
  .end((err, response)=>{
    if(err){
      alert('Error while getting employee from DB ERROR : '+err);
      return;
    }
    console.log(JSON.stringify(response.body));
    this.setState({
      employees:response.body.results
    })
  });
}
updateEmployee(event){
  console.log("EmployeeRegistration:updateEmployee(-) for field: "+event.target.name);
  //create a copy
  let updatedEmployee = Object.assign({}, this.state.employee);
  //update value
  updatedEmployee[event.target.name] = event.target.value;
  //reassign the state
  this.setState({
    employee: updatedEmployee
  })
}
submitEmployee(event){
  console.log("EmployeeRegistration:submitEmployee updatedEmployee = "+JSON.stringify(this.state.employee));
  let updatedEmployees = Object.assign([], this.state.employees);
   updatedEmployees.push(this.state.employee);
   superagent
   .post('/api/employee')
   .set('Accept', 'application/json')
   .send(this.state.employee)
   .end((err, response)=>{
     if(err){
       alert('Error while saving employee into DB, ERROR : '+err);
       return;
     }
     let emptyEmp = {};
     console.log(JSON.stringify(response.body));
     this.setState({
       employees: updatedEmployees,
       employee: emptyEmp
     })
   });
}

editEmployee(event){
  console.log("EmployeeRegistration:editEmployee got called for employee with _id "+event.target.value);
  let employee = this.getEmployeeById(event.target.value);
  console.log('employee = '+JSON.stringify(employee));
  /*this.setState({
  employee: employeeById
})*/
}

getEmployeeById(inputId){
  let employeeList = Object.assign([], this.state.employees);
  let employeeById = this.state.employees.map((employee)=>{
    if(employee._id == inputId){
      return employee;
    }
  });
  return employeeById;
}
  render(){
    let sNo = 1;
    const employeeList = this.state.employees.map((employee, i)=>{
      return <tr key = {i}>
        <td>{sNo++}</td>
          <td>{employee.name}</td>
          <td>{employee.employeeId}</td>
          <td>{employee.email}</td>
          <td>{employee.address}</td>
          <td>
           <button type="button" className="btn btn-success custom-width" value = {employee._id} onClick = {this.editEmployee.bind(this)} >Edit</button>  <button type="button" className="btn btn-danger custom-width">Remove</button>
          </td>
        </tr>;
    });
    return(
      <div>
      <div className="panel panel-default">
        <div className="panel-heading text-center">
          <span className="lead">Employee Registration Form </span>
        </div>
        <div className = "panel-body">
           <div className="form-horizontal">
              <div className="row">
                  <div className="form-group col-md-12">
                     <label className="col-md-2 control-lable">Name</label>
                      <div className="col-md-7">
                          <input type="text" onChange = {this.updateEmployee.bind(this)} name = "name" value = {this.state.employee.name} className="form-control input-sm" placeholder="Enter your name"/>
                      </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-12">
                       <label className="col-md-2 control-lable">EmployeeID</label>
                        <div className="col-md-7">
                            <input type="text" onChange = {this.updateEmployee.bind(this)} name = "employeeId" value = {this.state.employee.employeeId} className="form-control input-sm" placeholder="Enter your Employee ID"/>
                        </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="form-group col-md-12">
                         <label className="col-md-2 control-lable">Email ID</label>
                          <div className="col-md-7">
                              <input type="text" onChange = {this.updateEmployee.bind(this)} name = "email" value = {this.state.employee.email} className="form-control input-sm" placeholder="Enter your Email Id"/>
                          </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-12">
                           <label className="col-md-2 control-lable">Address</label>
                            <div className="col-md-7">
                                <input type="text" onChange = {this.updateEmployee.bind(this)} name = "address" value = {this.state.employee.address} className="form-control input-sm" placeholder="Enter your Address"/>
                            </div>
                          </div>
                      </div>
                      <div className="row">
                        <div className = "col-md-7"></div>
                        <div className="form-actions floatRight col-md-5">
                            <input type="submit" onClick = {this.submitEmployee.bind(this)} value={!this.state.employee._id ? 'Add' : 'Update'} className="btn btn-primary btn-sm"/>
                            <button type="button" className="btn btn-warning btn-sm">Reset Form</button>
                        </div>
                    </div>
              </div>
            </div>
        </div>
        <div className="panel panel-default">
              <div className="panel-heading text-center"><span className="lead">List of Employee </span></div>
              <div className="tablecontainer">
                  <table className="table table-hover">
                      <thead>
                          <tr>
                              <th>S.No.</th>
                              <th>Name</th>
                              <th>Employee ID</th>
                              <th>Email</th>
                              <th>Address</th>
                              <th width="20%"></th>
                          </tr>
                      </thead>
                      <tbody>
                            {employeeList}
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
    );
  }
}

export default EmployeeRegistration;
