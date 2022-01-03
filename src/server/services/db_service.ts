import mysql from 'mysql'

export const mysqlConnect = async () => {
    const db = mysql.createConnection({
        host: 'localhost',
        port: 8889,
        user: 'root',
        password: 'root',
        database: process.env.DATABASE_NAME || 'be-even'
    })
}