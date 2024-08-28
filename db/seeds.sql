INSERT INTO department (name) VALUES ('Sales'), ('Service'), ('Underwriting');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Broker', 60000, 1),
('Service Broker', 50000, 2),
('Insurance Underwriter', 55000, 3);

INSERT INTO employee (first_name, last_name, role_id) VALUES
('Bon', 'Jovi', 1),
('Bob', 'Ross', 2),
('Steve', 'Harvey', 3);