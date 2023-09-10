const db = require('../config/connection');
const inquirer = require('inquirer')

exports.viewAllDepartments = () => {
    return new Promise ((resolve, reject) => {
        const sql =`
        SELECT 
          department.id AS 'ID',
          department.name AS 'Department Name'
        FROM department
        `;
        db.query(sql, (err, department) => {
            if (err){
                console.log(`An error occured:${err.message}`)
                return;
            }
            console.table(department)
            resolve(department)
        })
    })
}

exports.addADepartment = () => {
    return new Promise (async (resolve, reject) =>{
        try{
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
            console.table(result);
            resolve();
        });
    } catch (err) {
        console.log(`An error occured:${err.message}`)
    }
    })
}