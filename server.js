const mysql2 = require('mysql2')
const inquirer = require('inquirer')


function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'theAction',
        message:'What would you like to view?',
        choices:['View all departments', 'View all Roles', 'View all employees', 'Add A department', 'Add a role', 'Add an employee', 'Update an employee role']
    }).then(answers => {
        switch (answers.theAction){
            case 'View all department':
            viewAllDepartments();
            break;

            case 'View all Roles':
                viewAllRoles();
            break;

            case'View all employees':
            viewAllEmployees();
            break;

            case'Add A department':
            addADepartment();
            break;

            case'Add a role':
            addARole()
            break;

            case'Add an employee':
            addAnEmployee();
            break;

            case'Update an employee role':
            updateAnEmployeeRole()
            break;
        }
    })
}