import mysql from 'mysql2';
import { v4 } from 'uuid';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: process.env.DATABASE_NAME || 'quote_machine',
});

export const mysqlConnect = async () => {
  connection.connect((err: any) => {
    if (err) throw err;
    console.log('connected');
  });
};

export const createUser = async (username: string, password: string) => {
  try {
    const uuid = v4();
    const userTable = `INSERT INTO Users (username, password, userID) VALUES ('${username}', '${password}', '${uuid}')`;

    connection.query(userTable, (err, result) => {
      if (err) throw err;
    });
  } catch (err) {
    throw err;
  }
};

export const authenticate = async (username: string, password: string) => {
  try {
    const loginQuery =
      'SELECT * FROM Users WHERE username = ? AND password = ?';

    connection.query(
      loginQuery,
      [username, password],
      (err, result, fields) => {
        if (err) {
          throw err;
        }
      }
    );
  } catch (err) {
    throw err;
  }
};
