const mysql = require('mysql2/promise');

const connectDB = async () => {

    return mysql.createConnection({

        database: process.env.db,
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        port: process.env.port

    });

}

module.exports = connectDB;
