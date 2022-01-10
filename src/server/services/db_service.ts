import mysql from 'mysql2';
import { v4 } from 'uuid';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: process.env.DATABASE_NAME || 'quote_machine',
});
let user: Object;

export const mysqlConnect = async () => {
  connection.connect((err: any) => {
    if (err) throw err;
    console.log('connected');
  });
};

export const createUser = async (username: string, password: string) => {
  try {
    const uuid = v4();
    const insertNewUser = `INSERT INTO Users (username, password, userID) VALUES ('${username}', '${password}', '${uuid}')`;

    connection.query(insertNewUser, (err, result) => {
      if (err) throw err;
    });
  } catch (err) {
    throw err;
  }
};

export const authenticate = async (
  username: string,
  password: string,
  res: any
) => {
  try {
    const loginQuery =
      'SELECT * FROM Users WHERE username = ? AND password = ?';
    return new Promise((resolve, reject) => {
      connection.query(
        loginQuery,
        [username, password],
        (err, result: any, fields) => {
          if (result.length > 0) {
            let user = {
              username: result[0].username,
              userID: result[0].userID,
            };
            resolve(user);
          } else {
            res.status(403).json({ message: 'invalid credentials' });
          }
        }
      );
    });
  } catch (err) {
    throw err;
  }
};

export const newQuote = async (quote: string, userID: string) => {
  try {
    const uuid = v4();
    const insertNewQuote = `INSERT INTO Quotes (quote, quoteID, userID) VALUES ('${quote}', '${uuid}', '${userID}')`;

    connection.query(insertNewQuote, (err, result) => {
      if (err) throw err;
    });
  } catch (err) {
    throw err;
  }
};

export const getAllUserQuotes = async (userID: string, res: any) => {
  try {
    const allUserQuotesQuery = `
    SELECT Users.username, Quotes.quote, Quotes.quoteID
    FROM Quotes
    INNER JOIN Users ON Users.userID = Quotes.userID
    WHERE Quotes.userID = ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(allUserQuotesQuery, [userID], (err, result: any) => {
        console.log(result)
        resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
};

export const getAllQuotes = async (userID: any, res: any) => {
  try {
    const allQuotesQuery = `
    SELECT Users.username, Quotes.quote, Quotes.quoteID
    FROM Quotes
    INNER JOIN Users ON Users.userID = Quotes.userID
    WHERE Quotes.userID <> ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(allQuotesQuery, [userID], (err, result: any) => {
        console.log(result);
        resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
};

export const checkIfUserExists = async (userID: string) => {
  try {
    const userExists = 'SELECT * FROM Users WHERE userID = ?';
    return new Promise((resolve, reject) => {
      connection.query(userExists, [userID], (err, result: any) => {
        if (result.length > 0) {
          resolve(true);
        }
        resolve(false);
      });
    });
  } catch (error) {
    throw error;
  }
};
