const cTable = require('console.table');
require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');

// creating database connection

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`\n Connected to company_info database! \n`)
);

//Function for viewing company departments

function viewDeps() {
    const questionPrompt = require('../helpers/questionPrompt');

    try {
        db.query('SELECT * FROM departments', (err, results) => {
            err ? console.log(err) : console.log('\n Success! \n\n Here are all the company departments requested \n'); console.table(results);
            questionPrompt();
        });
    }
    catch (err) {
        console.log(err, 'Error viewing all departments');
        questionPrompt();
    };

};

//Function for viewing all employment roles

function viewRoles() {
    const questionPrompt = require('../helpers/questionPrompt');

    try {
        db.query('SELECT * FROM roles', (err, results) => {
            err ? console.log(err) : console.log('\n Success! \n\n Here are all the employment roles requested \n'); console.table(results);
            questionPrompt();
        });
    }
    catch (err) {
        console.log(err, 'Error viewing all roles');
        questionPrompt();
    };
};

//Function for viewing all currently employed employees

function viewEmployees() {
    const questionPrompt = require('../helpers/questionPrompt');

    try {
        db.query('SELECT * FROM employees', (err, results) => {
            err ? console.log(err) : console.log('\n Success! \n\n Here are all the current employees resquested \n'); console.table(results);
            questionPrompt();
        });
    }
    catch (err) {
        console.log(err, 'Error viewing all employees');
        questionPrompt();
    };
};

//Function for adding new deparments to company database

function addDepartment() {
    const questionPrompt = require('../helpers/questionPrompt');

    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Please specify the name of the department you would like to add.'
        }
    ]).then((answers) => {

        let query = 'INSERT INTO departments(name) VALUES (?)';
        db.query(query, [answers.newDepartment], (err, results) => {
            (err) ? console.log(err) : console.log(`\n Success! \n\n New department ${answers.newDepartment}\n was added.`);
            questionPrompt();
        });
    }).catch((err) => {
        console.log(err, 'Error adding new department');
        questionPrompt();
    });

};

//Function with additional user questions for adding employment roles to the company database

function addRole() {
    const questionPrompt = require('../helpers/questionPrompt');

    const addRoleQuestions = [

        {
            type: 'input',
            name: 'roleTitle',
            message: 'Please specify the title of the new role.'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please specify the salary for the new role.'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Please specify the department ID associated with the new role.'
        }
    ];

    inquirer.prompt(addRoleQuestions).then((answers) => {

        let query = 'INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)';
        db.query(query, [answers.roleTitle, answers.salary, answers.departmentId], (err, results) => {
            (err) ? console.log(err) : console.log(`\n Success! \n\n New role ${answers.roleTitle} with salaray of ${answers.salary} and depart ID of ${answers.departmentId} added.\n`)
            questionPrompt();
        });
    }).catch((err) => {
        console.log(err, 'Error adding new role');
        questionPrompt();
    });
};

//Function with additional user questions for adding new employees to the company database

function addEmployee() {
    const questionPrompt = require('../helpers/questionPrompt');

    const newEmployeeQuestions = [
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "Please enter the new employee's first name."
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "Please enter the new employee's last name."
        },
        {
            type: 'input',
            name: 'roleId',
            message: "Please enter the new employee's associated role ID"
        }
    ];

    inquirer.prompt(newEmployeeQuestions).then((answers) => {

        let query = 'INSERT INTO employees(first_name, last_name, role_id) VALUES (?,?,?)';
        db.query(query, [answers.employeeFirstName, answers.employeeLastName, answers.roleId], (err, results) => {
            (err) ? console.log(err) : console.log(`\n Success! \n\n New employee ${answers.employeeFirstName} ${answers.employeeLastName} was created and added to department ${answers.roleId}`);
            questionPrompt();
        });
    }).catch((err) => {
        console.log(err);
        questionPrompt();
    });

};

//Function for updating an employees role within the company database

function updateEmployeeRole() {
    const questionPrompt = require('../helpers/questionPrompt');

    const updateEmployeeInfo = [
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "Please enter the first name of the employee to be updated."
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "Please enter the last name of the employee to be updated."
        },
        {
            type: 'input',
            name: 'updatedRole',
            message: "Please update the role of the employee."
        }
    ];

    inquirer.prompt(updateEmployeeInfo).then((answers) => {

        let query = `UPDATE employees SET employees.role_id = ${answers.updatedRole} WHERE employees.first_name = ? AND employees.last_name = ?`;
        db.query(query, [answers.employeeFirstName, answers.employeeLastName], (err, results) => {
            err ? console.log(err) : console.log(`\n Success \n\n ${answers.employeeFirstName} ${answers.employeeLastName}'s role has been updated to ${answers.updatedRole}.`);
            console.log(results);
        });
        questionPrompt();
    }).catch((err) => {
        console.log(err);
        questionPrompt();
    });

}

//Exporting functions

module.exports = { viewDeps, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };