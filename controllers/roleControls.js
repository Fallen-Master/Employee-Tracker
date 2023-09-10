const { mysql: getDbConnection } = require('../config/connection');
const db = getDbConnection();
const inquirer = require('inquirer')

function fetchRoles() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, 
    title FROM role`;
    db.query(sql, (err, roles) => {
      if (err) 
      return reject(err);
      resolve(roles)
    })
  })
};

function viewAllRoles() {
  return new Promise((resolve, reject) => {
    const sql = `
SELECT
    role.id AS ID,
    role.title AS Title,
    role.salary AS Salary,
    department.name AS Department
FROM role
JOIN department ON role.department_id = department.id;
`;

    db.query(sql, (err, roles) => {
      if (err) {
        return reject(err);
      }
      console.table(roles )
      resolve(roles)
    })

  })
};

function addARole() {
  return new Promise(async (resolve, reject) => {
    try {
      const newRole = [
        {
          name: 'newRoleName',
          type: 'input',
          message: 'Please name the new role',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Please provide the salary for this new role',
        },
      ];
      const answers = await inquirer.prompt(newRole);
      const sql = 'INSERT INTO role (title, salary) VALUES (?, ?)'; 

      db.query(sql, [answers.newRoleName, answers.salary], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result); 
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports ={addARole, viewAllRoles}
