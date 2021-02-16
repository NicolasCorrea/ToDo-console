const Task = require("../models/Task");

class TaskController {
    async index() {
        return await Task.all();
    }

    async getCompletedOrPending(is_completed = true) {
        let tasks = [];
        if (is_completed) {
            tasks = await Task.getCompleted();
        } else {
            tasks = await Task.getPending();
        }

        return tasks
    }


    async show(id) {
        return await Task.find(id);
    }

    async store({ desc }) {
        try {
            const task = new Task({});
            task.desc = desc;
            await task.save();
            return task;
        } catch (error) {
            return error;
        }
    }

    async togleComplete (ids) {
        await Task.unComplete();
        ids.forEach(async (id) => {
            const task = await Task.find(id);
            return await task.complete();
        });
    }
    
    update(id, { desc, completedAt }) {
        
    }

    async destroy(id) {
        const task = await Task.find(id);
        return await task.delete();
    }
}


module.exports = TaskController;