require('dotenv').config();
const { mysql: getConnection } = require('./config/connection');
const connection = getConnection();
const inquirer = require('inquirer');
const {viewAllDepartments, addADepartment} = require('./controllers/departmentControls');
const employeeControls = require('./controllers/employeeControls');
const roleControls = require('./controllers/roleControls');

const MAIN_MENU_CHOICES = [
    'View all departments',
    'View all Roles',
    'View all employees',
    'Add A department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Exit'
];
connection.connect(err => {
    if (err) throw err;
    mainMenu();
  });


async function mainMenu() {
    try {
        const answers = await inquirer.prompt({
            type: 'list',
            name: 'theAction',
            message: 'What would you like to view?',

            choices: MAIN_MENU_CHOICES
        });

        if (answers.theAction === 'Exit') {
            console.log('Goodbye!');
            return;
        }

        switch (answers.theAction) {
            case 'View all departments':
                await viewAllDepartments();
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