USE employees;
 INSERT INTO department (name) VALUES
    ('HR'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 90000, 2),  
('HR Manager', 85000, 1),         
('Finance Analyst', 76000, 3),    
('Legal Advisor', 91000, 4),      
('Sales Manager', 70000, 5);      

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Maria', 'Gonzlez', 2, null);

COMMIT;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodrguez', 2, 1),
('Kevin', 'Tupik', 3, 1),
('Kunal', 'Singh', 4, 2);
