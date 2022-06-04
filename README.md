# Employee Tracker 
## Description
A command-line application that allows a user to be able to view and manage departments, roles, and employees in a company to organize and plan their business. Once the user starts the application with 'node server.js' they are presented with the following options:
https://user-images.githubusercontent.com/99932948/171981524-a3c439cf-71da-40b6-a97f-99b6f2cc9996.mp4
## Click on the Options Below for more Information 
* [View all Departments](#view_all_departments)
* [View all Roles](#View_all_Roles)
* [View all employees](#View_all_Employees)
* [Add a department](#Add_a_Department)
* [Add a role](#Add_a_Role) 
* [Add an employee](#Add_an_Employee)
* [Update an employee](#Update_an_Employee)
* [Schemas](#Schemas)
* [Future Ideas](#Future_Ideas)

### View_all_Departments
When the option to 'View all departments' is chosen the user is presented with a formatted table showing the department names and ids.
![View Departments](/utils/imgs/vdepartment.png "View Departments")

### View_all_Roles
When the option to 'View all roles' is chosen the user is presented with a formatted table showing the job title, role id, the department that role belongs to, and the salary for that role. 
![View Roles](/utils/imgs/vroles.png "View Roles")

### View_all_Employees
When the option to 'View all employees' is chosen the user is presented with a formatted table showing employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to. 
![View Employees](/utils/imgs/vemployees.png "View Employees")

### Add_a_Department 
When the option to 'Add a department' is chosen the user is prompted to to enter the name of the department and that department is added to the database.
![Add Department](/utils/imgs/adept.png "Add Department")

### Add_a_Role 
When the option to 'Add a role' is chosen the user is prompted to enter the name, salary, and department for that role and it is added to the database.
![Add Role](/utils/imgs/arole.png "Add Role")

### Add_an_Employee 
When the option to 'Add an employee' is chosen the user is prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database.
![Add Employee](/utils/imgs/aemp.png "Add Employee")

### Update_an_Employee
When the option to 'Update an employee' is chosen the user is prompted to select an employee to update and their new role and this information is updated in the database.
![Update Employee](/utils/imgs/updateemp.png "Update Employee")

### Schemas

* Department
    * id: INT PRIMARY KEY
    * name: VARCHAR(30) to hold department name
* Role
    * id: INT PRIMARY KEY
    * title: VARCHAR(30) to hold role title
    * salary: DECIMAL to hold role salary
    * department_id: INT to hold reference to department role belongs to
* Employee
    * id: INT PRIMARY KEY
    * first_name: VARCHAR(30) to hold employee first name
    * last_name: VARCHAR(30) to hold employee last name
    * role_id: INT to hold reference to employee role
    * manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)

### Future_Ideas 

Updates to the application will involve the following abilities: 
* Update employee managers
* View employees by manager
* View employees by department
* Delete departments, roles, and employees
* View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
