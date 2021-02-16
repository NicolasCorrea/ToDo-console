require('colors');
require('./database/init');

const TaskController = require('./controllers/TaskController');
const {
    inquirerMenu,
    pause,
    readInput,
    deleteTask,
    confirm,
    completeTask
} = require('./helpers/inquirer');

const main = async () => {
    console.clear();
    let opt = '';
    const taskController = new TaskController()
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput('Enter a desc for new task: ');
                const newTask = await taskController.store({ desc })
                console.log(`Task saved ${"successfully".green}`)
                break;
            case '2':
                console.log("\n")
                const tasks = await taskController.index();
                tasks.forEach((v, i) => {
                    const index = `${i + 1}.`.green;
                    const is_complete = v.completed_at === null ? "Pending".red : "Complete".green;
                    console.log(`${index} ${v.desc} :: ${is_complete}`);
                });
                break;
            case '3':
                console.log("\n")
                const completedTasks = await taskController.getCompletedOrPending()
                completedTasks.forEach((v, i) => {
                    const index = `${i + 1}.`.green;
                    console.log(`${index} ${v.desc} :: ${v.completed_at}`);
                });
                break;
            case '4':
                console.log("\n")
                const pendingTask = await taskController.getCompletedOrPending(false)
                pendingTask.forEach((v, i) => {
                    const index = `${i + 1}.`.green;
                    console.log(`${index} ${v.desc}`);
                });
                break;
            case '5':
                const completeTasks = await completeTask();
                taskController.togleComplete(completeTasks);
                break;
            case '6':
                const deleteTask = await deleteTask();
                if (deleteTask !== 0) {
                    const confirmDelete = await confirm('Are you sure to do this? (y/n) ');
                    if (confirmDelete) {
                        await taskController.destroy(deleteTask);
                        console.log(`task deleted ${"succesfully".green}`)
                    }
                }
                break;
        }
        opt !== "0" && await pause();
    } while (opt !== "0");
}

main();