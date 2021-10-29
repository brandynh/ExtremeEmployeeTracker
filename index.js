//import packages
const inquirer = require('inquirer');
const fs = require('fs');

const selectUserAction = ()=>{
    return inquirer.prompt([
        {
            type:'list',
            name:'userChoice',
            message: 'What action would you like to take?' ,
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role']
        }

    ])
};

const init = ()=>{
    selectUserAction()
};

// Function call to initialize app
init();