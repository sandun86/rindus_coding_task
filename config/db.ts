import mysql from "mysql2";
import dotenv from 'dotenv';

const envFound = dotenv.config();

// MySQL connection pool
const pool = mysql.createPool({
    host: process.env.HOST,          // Replace with your MySQL server host
    user: process.env.USER_NAME,     // Replace with your MySQL username
    password: process.env.PASS_WORD, // Replace with your MySQL password
    database: process.env.DATABASE,  // Replace with your database name
});

export const connection = pool.promise();
