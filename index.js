const client = require('./db/connection');
const inquirer = require('inquirer');

client.query('SELECT * FROM employee', (err, res) => {
    if (err) {
        console.error('Error executing query', err);
    } else {
        console.log(res);
    }
});

function addDepartment(name) {
    client.query('INSERT INTO department (name) VALUES ($1)', [name], (err, res) => {
        if (err) {
            console.error('Error adding department', err);
        } else {
            console.log('Department added successfully.');
        }
    });
};

function updateEmployeeRole(employeeId, newRoleId) {
    client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId], (err, res) => {
        if (err) {
            console.error('Error updating employee role', err);
        } else {
            console.log('Employee role updated successfully.');
        }
    });
};

function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add department',
            'Add role',
            'Add employee',
            'Update employee role',
            'Exit'
        ]
    }).then(answer => {
        switch(answer.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add department':
                promptAddDepartment();
                break;
            case 'Add role':
                promptAddRole();
                break;
            case 'Add employee':
                promptAddEmployee();
                break;
            case 'Update employee role':
                promptUpdateEmployeeRole();
                break;
            case 'Exit':
                client.end();
                console.log('Goodbye!');
                break;
        }
    });
}

function promptAddDepartment() {
    inquirer.prompt({
        name: 'name',
        message: 'Enter the name of the department:'
    }).then(answer => {
        addDepartment(answer.name);
    });
}

function viewAllDepartments() {
    client.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.error('Error retrieving departments', err);
        } else {
            console.table(res);
        }
    });
}

function viewAllRoles() {
    client.query('SELECT * FROM role', (err, res) => {
        if (err) {
            console.error('Error retrieving roles', err);
        } else {
            console.table(res);
        }
    });
}

function viewAllEmployees() {
    client.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.error('Error retrieving employees', err);
        } else {
            console.table(res);
        }
    });
}

function promptAddRole() {
    inquirer.prompt([
        {
            name: 'title',
            message: 'Enter the role title:'
        },
        {
            name: 'salary',
            message: 'Enter the salary for the role:'
        },
        {
            name: 'department_id',
            message: 'Enter the department ID for this role:'
        }
    ]).then(answers => {
        promptAddRole(answers.title, answers.salary, answers.department_id);
    });
}

function addRole(title, salary, department_id) {
    client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
        [title, salary, department_id], (err, res) => {
            if (err) {
                console.error('Error adding role', err);
            } else {
                console.log('Role added successfully.');
            }
        });
}

