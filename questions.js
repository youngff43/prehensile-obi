const questions = [{
    type: 'list',
    name: 'menu',
    message: 'Choose from the options below.',
    choices: [
        'View all Departments', 
        'View all Roles', 
        'View all Employees', 
        'Add a Department', 
        'Add a Role', 
        'Add an Employee', 
        'Update an Employee',
        'Quit']
},
{
    type: 'input',
    name: 'deptname',
    message: 'Enter in the departments name.',
    validate(answer) {
        if(!answer) {
            return "You must enter in the departments name"
        }
        return true
    },
    when: (answers) => answers.menu === 'Add a Department'
},
{
    type: 'input',
    name: 'rolename',
    message: 'Enter in the name of the role.',
    validate(answer) {
        if(!answer) {
            return "You must enter in the name of the role"
        }
        return true
    }
},
{
    type: 'input',
    name: 'rolesalary',
    message: 'Enter in the salary for the role.',
    validate: answer => isNaN(parseInt(answer)) ? 'Please enter in a valid salary' : true,
    filter: answer => isNaN(parseInt(answer)) ? "" : parseInt(answer),
},
{
    type: 'input',
    name: 'roledept',
    message: 'Enter in the department for the role.',
},
{
    type: 'input',
    name: 'employeefirst',
    message: 'Enter in the first name of the employee.',
},
{
    type: 'input',
    name: 'employeelast',
    message: 'Enter in the last name for the employee',
},
{
    type: 'input',
    name: 'employeerole',
    message: 'Enter in the role for the employee.',
},
{
    type: 'input',
    name: 'remployeemanager',
    message: 'Enter in the mnanager for the employee.',
},
{
    type: 'input',
    name: 'rolesalary',
    message: 'Enter in the salary for the role.',
    validate: answer => isNaN(parseInt(answer)) ? 'Please enter in a valid salary' : true,
    filter: answer => isNaN(parseInt(answer)) ? "" : parseInt(answer),
},]