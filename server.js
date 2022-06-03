// Dependancies 
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Charlie89',
      database: 'companyinfo'
    });

connection.connect(function(err) {
    if (err) throw err;
        console.log("You are connected to the Company Info Database as id " + connection.threadId);
        menuPrompt();
    });

function menuPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'Welcome. Choose from the following options.',
        choices: [
            'View all Departments',
            'View all Roles',
            'View all Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Exit'
        ],
    },)
    .then(function ({ menu }) {
        switch (menu) {
            case 'View all Departments':
                viewallDepartments();
                break;
    
            case 'View all Roles':
                viewallRoles();
                break;
    
            case 'View all Employees':
                viewallEmployees();
                break;
    
            case 'Add a Department':
                addDepartment();
                break;
    
            case 'Add a Role':
                addRole();
                break;
    
            case 'Add an Employee':
                addEmployee();
                break;

            // case 'Update an Employee':
            //     updateEmployee();
            //     break;
    
            case 'Exit':
              connection.exit();
              break;
          }
        });
    }

//function to view all departments and return back to the menu
function viewallDepartments() {
    const sql = `SELECT * FROM departments ORDER BY id;`;
                connection.query(sql, function (err, res) {
                    if (err) throw err;
                    console.log('\n');
                    console.table(res);
                    menuPrompt();
                });
    }

//function to view all roles and return back to the menu
function viewallRoles() {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.dept_name AS department
                FROM roles
                LEFT JOIN departments ON roles.dept_id = departments.id;`;
                connection.query(sql, function (err, res) {
                    if (err) throw err;
                    console.log('\n');
                    console.table(res);
                    menuPrompt();
                });
    }

//function to view all employees and return back to the menu
function viewallEmployees() {
    const sql = `SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS full_name, roles.title, departments.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM (employees
                INNER JOIN roles ON roles.dept_id = employees.role_id)
                INNER JOIN departments ON departments.id = roles.dept_id
                LEFT JOIN employees manager on manager.id = employees.manager_id;`;
                connection.query(sql, function (err, res) {
                    console.log('\n');
                    console.table(res);
                    menuPrompt();
                });
    }

//function to add a department, show the new department in a table, and return to menu
function addDepartment() { 
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptname',
            message: 'Enter in the departments name.',
            validate(answer) {
                if(!answer) {
                    return "You must enter in a departments name"
                }
                return true
            },
        },
    ])
    .then(function (answer) {
        let sql = `INSERT INTO departments (dept_name) VALUES (?)`
        connection.query(sql, [answer.deptname], function (err, res) {
            if (err) throw err;
            viewallDepartments();
            menuPrompt();
        });
    })
    }

//function to add a new role, show the new role in a table, and return to menu
function addRole() {
    connection.query(`SELECT * FROM departments;`, (err, res) => {
    let chooseDepartment = res.map(departments => ({name: departments.dept_name, value: departments.id }));
    inquirer.prompt([
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
            // filter: answer => isNaN(parseInt(answer)) ? "" : parseInt(answer),
        },
        {
            type: 'list',
            name: 'roledept',
            message: 'Choose the department assosiated with the role.',
            choices: chooseDepartment
        },
    ])
    .then(function(answer) {
        let sqlTwo = `INSERT INTO roles (title, salary, dept_id) VALUES (?,?,?);`
        connection.query(sqlTwo, [ answer.rolename, answer.rolesalary, answer.roledept ], function (err, res) {
            if (err) throw err;
            console.log('\n');
            console.table(answer);
            menuPrompt();
        }
        )     
    });
  });
};

// function to add an employee to the table 
function addEmployee() {
    let sqlOne = `SELECT * FROM roles;`;
    connection.query(sqlOne, function (err, res) {
            if (err) throw err;
    let roles = res.map(roles => ({name: roles.title, value: roles.id }));
    let sqlTwo = `SELECT * FROM employees;`;
    connection.query(sqlTwo, function (err, res) {
            if (err) throw err;
    let managers = res.map(employees => ({name: employees.first_name + ' ' + employees.last_name, value: employees.id}));
    inquirer.prompt([
        {
            type: "input",
            name: "employeefirst",
            message: "Enter the first name of the employee",
            validate(answer) {
                if(!answer) {
                    return "You must enter in a employees name"
                }
                return true
            },
        },
        {
            type: "input",
            name: "employeelast",
            message: "Enter the last name of the employee",
            validate(answer) {
                if(!answer) {
                    return "You must enter in a employees name"
                }
                return true
            },
        },
        {
            type: 'list',
            name: 'employeerole',
            message: 'Choose the role for the employee.',
            choices: roles
        },
        {
            type: 'list',
            name: 'employeemanager',
            message: 'Choose the employees manager',
            choices: managers
        }
    ])
    .then((answer) => {
        let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`
        connection.query(sql, [ answer.employeefirst, answer.employeelast, answer.employeerole, answer.employeemanager ], function (err, res) {
            if (err) throw err;
        })
        connection.query(`INSERT INTO roles (dept_id) VALUES (?);`, [ answer.dept ], function (err, res) {
            if (err) throw err;
            menuPrompt();
            })
        })
    })
    })}
