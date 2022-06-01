const db = require('server.js')

function viewallDepartments() {
    const sql = `SELECT * FROM departments ORDER BY id;`;
                db.query(sql, (err, res) => {
                    if (err) throw err;
                    console.log('View all Departments');
                    prompt();
                });
}
function viewallRoles() {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.dept_name AS department
                FROM roles
                LEFT JOIN departments ON roles.dept_id = departments.id;`;
                db.query(sql, (err, res) => {
                    if (err) throw err;
                    console.log('View all Roles');
                    prompt();
                });
}

function viewallEmployees() {
    const sql = `SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS full_name, roles.title, departments.dept_name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM (employees
                INNER JOIN roles ON roles.dept_id = employees.role_id)
                INNER JOIN departments ON departments.id = roles.dept_id
                LEFT JOIN employees manager on manager.id = employees.manager_id;`;
                db.query(sql, (err, res) => {
                    if (err) throw err;
                    console.log('View all Employees');
                    prompt();
                });
}





