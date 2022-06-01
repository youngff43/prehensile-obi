INSERT INTO departments (dept_name)
VALUES
    ('Admin'),
    ('Battalion'),
    ('Truck'),
    ('Engine'),
    ('Ambulance');

INSERT INTO roles (title, salary, dept_id)
VALUES
    ('Chief', 100000.00, 1),
    ('Captain', 90000.00, 2),
    ('Lieutenant', 60000.00, 3),
    ('Firefighter', 60000.00, 4),
    ('EMT', 50000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 2, 3),
    ('Alex', 'Young', 3, 1),
    ('Sarah', 'Dexter', 1, NULL),
    ('Daniel', 'Bliss', 5, 2),
    ('Cassie', 'Yager', 4, 2);