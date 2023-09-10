const { mysql: getDbConnection } = require('../config/connection');
const db = getDbConnection();
const inquirer = require('inquirer')

exports.viewAllEmployees = () => {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT
            employee.id AS 'ID',
            employee.first_name AS 'First Name',
            employee.last_name AS 'Last Name',
            role.title AS 'Job Title',
            department.name AS 'Department',
            role.salary AS 'Salary',
            CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager'
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id;
        `;
        db.query(sql, (err, employee) => {
            if (err) {
                console.log(`An error occurred:${err.message}`)
                return;
            }
            console.table(employee);
            resolve();
        })
    })
}

async function fetchRoles() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, title FROM role';
        db.query(sql, (err, results) => {
            if (err) reject(err);
            resolve(results.map(role => ({ name: role.title, value: role.id })));
        })
    })
}

exports.addAnEmployee = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentRoles = await fetchRoles();

            const newEmployeeQuestions = [
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the new hires first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the new hires last name?'
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'Please choose from the current list of roles',
                    choices: currentRoles
                }
            ];

            const answers = await inquirer.prompt(newEmployeeQuestions)

            const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;

            db.query(sql, [answers.firstName, answers.lastName, answers.role], (err, result) => {
                if (err) {
                    console.log(`An error occurred:${err.message}`)
                    return;
                }
                console.log("A new Employee has been added");
                console.table(result);
                resolve();
            });
        } catch (err) {
            console.log(`An error occured: ${err.message}`)
        }
    });
}

async function fetchEmployees() {
    return new Promise((resolve, reject) => {
        const sql = `
    SELECT 
        first_name AS 'First Name', 
        last_name AS 'Last Name',  
        role.title AS 'Title'
    FROM employee
    LEFT JOIN role on employee.role_id = role.id`;
        db.query(sql, (err, results) => {
            if (err) reject(err);
            resolve(results.map(employee => ({ name: employee['First Name'], lastName: employee['Last Name'], title: employee.Title })))
        })
    })
}

exports.updateAnEmployeeRole = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentEmployees = await fetchEmployees();

            const selectEmployee = [
                {
                    name: 'employeeId',
                    type: 'list',
                    message: 'Which Employee needs thier role updated?',
                    choices: currentEmployees.map(emp => ({name: `${emp.name} ${emp.lastName}`, value: emp.id}))
                }
            ];

            const chosenEmployee = await inquirer.prompt(selectEmployee);

            const currentRoles = await fetchRoles();

            const updatedRole = [
                {
                    name: 'roleId',
                    type: 'list',
                    message: 'Please select from the current roles',
                    choices: currentRoles
                }
            ];
            const roleAnswer = await inquirer.prompt(updatedRole)
            const sql = `UPDATE employee SET role_id=? WHERE id=?`;

            db.query(sql, [roleAnswer.roleId, chosenEmployee.employeeId], (err, result) => {
                if (err){
                    console.log(`An error occured: ${err.message}`);
                    return reject(err);
                }
                console.log("The employee's role has been updated.");
                console.table(result);
                resolve();
            });
        }catch (err) {
            console.log(`An error occurred: ${err.message}`);
            reject(err);
        }
    });
};