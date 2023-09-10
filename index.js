require('dotenv').config();
const mysql2 = require('mysql2')
const inquirer = require('inquirer')
const departmentControls = require('./controllers/departmentControls')
const employeeControls = require('./controllers/employeeControls')
const roleControls = require('./controllers/roleControls')


async function mainMenu() {
    try {
        const answers = await inquirer.prompt({
            type: 'list',
            name: 'theAction',
            message: 'What would you like to view?',

            choices: [
                'View all departments',
                'View all Roles',
                'View all employees',
                'Add A department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        });

        if (answers.theAction === 'Exit') {
            console.log('Goodbye!');
            return;
        }

        switch (answers.theAction) {
            case 'View all departments':
                viewAllDepartments();
                break;

            case 'View all Roles':
                viewAllRoles();
                break;

            case 'View all employees':
                viewAllEmployees();
                break;

            case 'Add A department':
                addADepartment();
                break;

            case 'Add a role':
                addARole()
                break;

            case 'Add an employee':
                addAnEmployee();
                break;

            case 'Update an employee role':
                updateAnEmployeeRole()
                break;
        }
        mainMenu()
    } catch (error) {
        console.error("An error occurred:", error);
        mainMenu();  // In case of an error, show the menu again
    }
}