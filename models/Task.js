require('colors')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


class Task {



    _id = '';
    _desc = '';
    _completed_at = null;

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value
    }

    get desc() {
        return this._desc;
    }

    set desc(value) {
        this._desc = value;
    }


    get completedAt() {
        return this._completed_at
    }

    set completedAt(value) {
        this._completed_at = value;
    }


    constructor({ id = '', desc = '', completedAt = null }) {
        this.id = id;
        this.desc = desc;
        this.completedAt = completedAt
    }

    async save() {
        try {
            const db = await require("../database/db")();
            if (!this.id) {
                this.id = uuidv4();
            }
            const result = await db.run(
                /*sql*/`INSERT INTO tasks (id, desc, completed_at) VALUES (?, ?, ?)`,
                [this._id, this._desc, this._completed_at]
            );
            return result;
        } catch (error) {
            return error;
        }
    }

    static async find(id) {
        const db = await require('../database/db')();
        const task = await db.get(/*sql*/`SELECT * FROM tasks WHERE id = ?`, id);

        return new Task({ id: task.id, desc: task.desc, completedAt: task.completed_at })
    }

    static async all() {
        try {
            const db = await require("../database/db")();
            return await db.all(/*sql*/`SELECT * FROM tasks`);
        } catch (err) {
            console.log(err.message)
            return new Error("fail to get all task")
        }
    }

    static async getCompleted() {
        const db = await require('../database/db')();
        return await db.all(/*sql*/`SELECT * FROM tasks WHERE completed_at IS NOT null`);
    }

    static async getPending() {
        const db = await require('../database/db')();
        return list = await db.all(/*sql*/`SELECT * FROM tasks WHERE completed_at IS null`)
    }
    
    static async unComplete() {
        const db = await require('../database/db')();
        return await db.run(/*sql*/`UPDATE tasks SET completed_at = null`);
    }
    
    async complete () {
        const db = await require('../database/db')();
        return await db.run(/*sql*/`UPDATE tasks SET completed_at = ? where id = ?`, [ moment().format("YYYY-MM-DD HH:mm"), this.id]);
    }

    async delete() {
        const db = await require('../database/db')();
        const result = await db.run(/*sql*/`DELETE FROM tasks where id = ?`, this.id);
        return result;
    }

}

module.exports = Task;