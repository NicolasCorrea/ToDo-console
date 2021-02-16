(async () => {
    const db = await require("./db")();
    try {
        await db.run(/*sql*/`
                CREATE TABLE IF NOT EXISTS tasks (
                    id TEXT PRIMARY KEY,
                    desc TEXT,
                    completed_at TASK DEFAUL NULL
                )`);
    } catch (error) {
        console.log(error)
    }
})()






// var stmt = db.prepare("INSERT INTO tasks (id, desc) VALUES (?, ?)");
// for (var i = 0; i < 10; i++) {
//     stmt.run([uuidv4(), "Ipsum " + i]);
// }
// stmt.finalize();

// db.each("SELECT id, desc FROM tasks", function (err, row) {
//     if (err) {
//         console.log('error', err.message)
//     }
//     console.log(`${row.id}: ${row.desc}`);
// });