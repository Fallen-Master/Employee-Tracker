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

function fetchDepartments() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name FROM department`;
    db.query(sql, (err, departments) => {
      if (err) return reject(err);
      resolve(departments);
    });
  });
}

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
      const departments = await fetchDepartments();
      const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id
      }));
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
        {
          name: 'department_id',
          type: 'list',
          message: 'Which department does this role belong to?',
          choices: departmentChoices,
        },
      ];
      const answers = await inquirer.prompt(newRole);
      const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)'; 

      db.query(sql, [answers.newRoleName, answers.salary, answers.department_id], (err, result) => {
        if (err) {
          return reject(err);
        }
        console.log('Role has been created')
        resolve(); 
      });
    } catch (err){
      console.log(`An error occured:${err.message}`)
    }
  });
};

module.exports ={addARole, viewAllRoles}
