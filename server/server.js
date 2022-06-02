require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createConnection } = require('./src/configs/db.config');
const { registerController } = require('./src/configs/controller.config');

const host = process.env.HOST;
const port = process.env.PORT;
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

const server = express();

try{
    server.use(morgan('dev'));
    server.use(cors(corsOptions));

    // register Controller
    registerController(server);
    // Create connection to database(MySQL)
    createConnection(
        process.env.MYSQL_HOST, 
        process.env.MYSQL_PORT, 
        process.env.MYSQL_DB, 
        process.env.MYSQL_USERNAME, 
        process.env.MYSQL_PASSWORD
    );
    server.listen(port, () => {
        console.log(`Example app listening at http://${host}:${port}`);
    });

}catch(err){
    throw err;
}
