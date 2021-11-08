const inquirer = require('inquirer');

//Requiring query functions

const {viewDeps,viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole} = require('./queries');

function questionPrompt(){

     inquirer.prompt([
        {
            type: 'list',
            name: 'userChoice',
            message: 'What action would you like to take?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                '~~~~~~~  EXIT  ~~~~~~~'
            ]
        }
    ]).then((answers) => {
        switch(answers.userChoice){
            case 'View all departments':
                viewDeps();
                break;
            
            case 'View all roles':
                viewRoles();
                break;

            case 'View all employees':
                viewEmployees();
                break;

            case 'Add a department':
                addDepartment();
                break;

            case 'Add a role':
                addRole();
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Update an employee role':
                updateEmployeeRole();
                break;
            
            case '~~~~~~~  EXIT  ~~~~~~~':
                process.exit(0);
        }
    }).catch((err) => {
        console.log(err);
    })
    
  };

  module.exports = questionPrompt;