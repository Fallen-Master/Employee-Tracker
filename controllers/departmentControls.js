const { mysql: getDbConnection } = require('../config/connection');
const db = getDbConnection();
const inquirer = require('inquirer')

function viewAllDepartments() {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT 
          department.id AS 'ID',
          department.name AS 'Department Name'
        FROM department
        `;
        db.query(sql, (err, department) => {
            if (err) {
                console.log(`An error occured:${err.message}`)
                return;
            }
            console.table(department)
            resolve()
        })
    })
}

function addADepartment() {
    return new Promise(async (resolve, reject) => {
        try {
            const newDepartment = [
                {
                    name: 'newDepartment',
                    type: 'input',
                    message: 'Please name the department you would like to add.'
                }
            ];
            const answer = await inquirer.prompt(newDepartment)

            const sql = `INSERT INTO department (name) VALUES (?)`;

            db.query(sql, [answer.newDepartment], (err, result) => {
                if (err) {
                    console.log(`An error occurred:${err.message}`)
                    return;
                }
                console.log("A new department has been created");
                resolve();
            });
        } catch (err) {
            console.log(`An error occured:${err.message}`)
        }
    })
}

module.exports = { viewAllDepartments, addADepartment };