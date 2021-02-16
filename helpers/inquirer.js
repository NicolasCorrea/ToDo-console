const inquirer = require('inquirer');
const Task = require('../models/Task');
require('colors');

// const menuOpts = 

const inquirerMenu = async () => {
    console.clear();

    console.log('=================================='.green)
    console.log('        Choose an option          '.yellow)
    console.log('=================================='.green)
    console.log("\n")

    const { option } = await inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "what you wanna do?",
            choices: [
                { value: "1", name: `${"1.".green} Create task` },
                { value: "2", name: `${"2.".green} List tasks` },
                { value: "3", name: `${"3.".green} List complete tasks` },
                { value: "4", name: `${"4.".green} List pending tasks` },
                { value: "5", name: `${"5.".green} Complete task(s)` },
                { value: "6", name: `${"6.".green} Delete task` },
                { value: "0", name: `${"0.".green} Exit` },
            ],

        }
    ])
    return option;
}

const pause = async () => {
    console.log("\n")
    const { option } = await inquirer.prompt([
        {
            type: "input",
            name: "option",
            message: `Press ${"ENTER".green} to continue`,
        }
    ])
    return option;
}

const readInput = async (message) => {
    const { question } = await inquirer.prompt([
        {
            type: 'input',
            name: 'question',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'please enter a value';
                }
                return true;
            }
        }
    ]);
    return question
}

const deleteTask = async (tareas) => {
    let choices = (await Task.all()).map((v, i) => {
        const index = i + 1;
        return ({ name: v.desc, value: v.id })
    })
    choices.unshift({ name: "0. Cancel", value: 0 })
    const { tasks } = await inquirer.prompt([
        {
            type: 'list',
            name: 'tasks',
            message: 'select task to delete',
            choices
        }
    ]);
    return tasks
}

const completeTask = async (tareas) => {
    let choices = (await Task.all()).map((v, i) => {
        const index = i + 1;
        return ({ name: v.desc, value: v.id, checked: v.completed_at !== null })
    });
    
    const { tasks } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'tasks',
            message: 'select tasks to complete',
            choices
        }
    ]);
    return tasks
}

const confirm = async (message) => {
    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message
        }
    ]);
    return confirm
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteTask,
    completeTask,
    confirm
}