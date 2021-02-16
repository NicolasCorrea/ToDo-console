const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const db = async () => {
    return await open({
        filename: "tmp/db.db",
        driver: sqlite3.Database
    })
}

module.exports = db;