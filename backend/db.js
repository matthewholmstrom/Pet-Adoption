import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config();

const pool = mysql.createPool({

    host: process.env.DB_Host,
    password: process.env.DB_Password,
    database: process.env.DB_Name,
    user: process.env.DB_User
    
})

export default pool;