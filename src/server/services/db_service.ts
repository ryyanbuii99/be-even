import mysql from 'mysql2';
import { v4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 8889 || process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export const mysqlConnect = async () => {
  connection.connect((err: any) => {
    if (err) throw err;
    console.log('connected');
  });
};

export const createUser = async (
  username: string,
  password: string,
  res: any
) => {
  try {
    const uuid = v4();
    const insertNewUser = `INSERT INTO Users (username, password, userID) VALUES ('${username}', '${password}', '${uuid}')`;
    return new Promise((resolve, reject) => {
      connection.query(insertNewUser, (err, result) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
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
      addRatingAfterQuoteCreation(uuid, userID);
    });
  } catch (err) {
    throw err;
  }
};

export const getAllUserQuotes = async (userID: string, res: any) => {
  try {
    const allUserQuotesQuery = `
    SELECT Users.username, Quotes.quote, Quotes.quoteID, AVG(Ratings.rating) AS avgRating
    FROM Quotes JOIN Users ON Users.userID = Quotes.userID 
    JOIN Ratings ON Quotes.quoteID = Ratings.quoteID
    WHERE Quotes.userID = ?
    GROUP BY Quotes.quoteID
    `;
    return new Promise((resolve, reject) => {
      connection.query(allUserQuotesQuery, [userID], (err, result: any) => {
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
    SELECT Users.username, Quotes.quote, Quotes.quoteID, AVG(Ratings.rating) AS avgRating
    FROM Quotes 
    JOIN Users ON Users.userID = Quotes.userID 
    JOIN Ratings ON Quotes.quoteID = Ratings.quoteID
    WHERE Quotes.userID <> ?
    GROUP BY Quotes.quoteID`;

    return new Promise((resolve, reject) => {
      connection.query(allQuotesQuery, [userID], (err, result: []) => {
        resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
};

export const rateQuote = async (
  rating: number,
  quoteID: string,
  userID: string
) => {
  try {
    const insertQuoteRating = `INSERT INTO Ratings (rating, quoteID, userID) VALUES ('${rating}', '${quoteID}', '${userID}')`;

    connection.query(insertQuoteRating, (err, result: any) => {
      if (err) throw err;
      deleteIndexRating(quoteID);
    });
  } catch (error) {
    throw error;
  }
};

export const getTopVotedQuotes = async () => {
  try {
    const top5 = `SELECT * FROM top_5_voted`;
    return new Promise((resolve, reject) => {
      connection.query(top5, (err, result: any) => {
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

export const deleteQuote = async (quoteID: string, userID: string) => {
  try {
    const deleteQuery = `
    DELETE Ratings, Quotes FROM Ratings 
    JOIN Quotes
    JOIN Users
    WHERE (Ratings.quoteID = '${quoteID}' 
    AND Quotes.quoteID = '${quoteID}'
    AND Users.userID = '${userID}')`;
    connection.query(deleteQuery, (err, result: any) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
};

export const updateQuote = async (quote: string, userID: string) => {
  try {
    const updateQuery = `
    UPDATE Quotes JOIN Users
    SET quote = ?
    WHERE Users.userID = ?`;
    connection.query(updateQuery, [quote, userID], (err, result: any) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
};

const addRatingAfterQuoteCreation = async (quoteID: string, userID: string) => {
  try {
    const insertQuoteRating = `INSERT INTO Ratings (rating, quoteID, userID) VALUES ('0', '${quoteID}', '${userID}')`;
    connection.query(insertQuoteRating, (err, result: any) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
};

const deleteIndexRating = async (quoteID: string) => {
  try {
    const deleteIndexAfterRate = `
    DELETE Ratings FROM Ratings 
    JOIN Quotes 
    WHERE (rating = 0 AND Ratings.quoteID = "${quoteID}")
    `;
    connection.query(deleteIndexAfterRate, (err, result: any) => {
      if (err) throw err;
    });
  } catch (error) {
    throw error;
  }
};
