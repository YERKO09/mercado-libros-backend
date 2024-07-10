require('dotenv').config();
const { Pool } = require('pg');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const connectionString = process.env.DB_STRING_URL;

const database = connectionString
  ? new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
        allowExitOnIdle: true,
    })
  : new Pool({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        allowExitOnIdle: true,
    });

try {
  /*Verifica la conexión*/
  database.query("SELECT NOW()"); 
  console.log("Database connected");  
} catch (error) {
  console.log(error);
}

module.exports = database;