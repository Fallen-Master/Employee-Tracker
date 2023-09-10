require('dotenv').config();
const { mysql: getConnection } = require('./config/connection');
const connection = getConnection();
const inquirer = require('inquirer');
const {viewAllDepartments, addADepartment} = require('./controllers/departmentControls');
const {viewAllEmployees, addAnEmployee, updateAnEmployeeRole} = require('./controllers/employeeControls');
const {addARole, viewAllRoles} = require('./controllers/roleControls');

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
                await viewAllRoles();
                break;

            case 'View all employees':
                await viewAllEmployees();
                break;

            case 'Add A department':
                await addADepartment();
                break;

            case 'Add a role':
                await addARole()
                break;

            case 'Add an employee':
                await addAnEmployee();
                break;

            case 'Update an employee role':
                await updateAnEmployeeRole()
                break;
        }
        mainMenu()
    } catch (error) {
        console.error("An error occurred:", error);
        mainMenu();  // In case of an error, show the menu again
    }
}