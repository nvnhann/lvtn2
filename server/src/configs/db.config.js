const mysql = require('mysql8');

const createConnection = (host, port, db, user, pwd) =>{
    
    const connection = mysql.createConnection({
        host: String(host),
        database: String(db),
        port: Number(port),
        user: String(user),
        password: String(pwd)
    });

    connection.connect( err =>{
        if(err) throw err;
        console.log("Successfully connected to the database.");
    })
}

module.exports = { createConnection }