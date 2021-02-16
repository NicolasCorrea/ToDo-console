require('colors');


const showMenu = () => {
    return new Promise((resolve) => {
        
        console.clear()
    
        console.log('=================================='.green)
        console.log('Choose an option'.green)
        console.log('=================================='.green)
        console.log("\n")
    
        `${"1.".green} Create task`
        `${"2.".green} List tasks`
        `${"3.".green} List complete tasks`
        `${"4.".green} List pending tasks`
        `${"5.".green} Complete task(s)`
        `${"6.".green} Delete task`
        `${"0.".green} Exit`
        console.log("\n");
    
        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readLine.question("Choose an option: ", (opt) => {
            readLine.close();
            resolve(opt);
        })
        
    })
    

}


const pause = () => {
    
    return new Promise( resolve => {
        const readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readLine.question(`Press ${ "ENTER".green } to continue`, (opt) => {
            readLine.close();
            resolve(opt);
        })
    })
}

module.exports = {
    showMenu,
    pause
}