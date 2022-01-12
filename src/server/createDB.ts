import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()
const createDB = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 8889 || process.env.DB_PORT,
  });

  connection.connect((err: any) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      createDBIfNotExist(connection);
      createTablesToDB()
      console.log('connected');
    }
  });
};

const createDBIfNotExist = (connection: mysql.Connection) => {
  connection.query('CREATE DATABASE quote_machine', (err) => {
    if (err) throw err;
    console.debug('quote_machine DB created');
  });
};

const createTablesToDB = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 8889 || process.env.DB_PORT,
    database: process.env.DB_NAME || 'quote_machine',
  });

  connection.connect((err) => {
    if (err) throw err;
    const createUsersTable =
      'CREATE TABLE Users (username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, userID VARCHAR(255) NOT NULL PRIMARY KEY)';

    const createQuotesTable = `CREATE TABLE Quotes (quote TEXT NOT NULL, quoteID VARCHAR(255) NOT NULL, userID VARCHAR(255) NOT NULL, PRIMARY KEY (quoteID, userID))`;

    const createRatingsTable = `CREATE TABLE Ratings (rating DOUBLE  NOT NULL, quoteID VARCHAR(255) NOT NULL, userID VARCHAR(255) NOT NULL)`;

    const createView = `
    CREATE VIEW top_5_voted AS
    SELECT Users.username, Quotes.quote, AVG(Ratings.rating)
    AS avgRating, COUNT(Quotes.quoteID) as rateCount
    FROM Quotes 
    JOIN Users ON Users.userID = Quotes.userID 
    JOIN Ratings ON Quotes.quoteID = Ratings.quoteID
    GROUP BY Quotes.quoteID
    ORDER BY rateCount DESC
    LIMIT 5
    `

    connection.query(createUsersTable, (err, result) => {
      if (err) throw err;
      console.log('created Users table');
    });

    connection.query(createQuotesTable, (err, result) => {
      if (err) throw err;
      console.log('created Quotes table');
    });

    connection.query(createRatingsTable, (err, result) => {
      if (err) throw err;
      console.log('created Ratings table');
    });

    connection.query(createView, (err, result) => {
      if (err) throw err;
      console.log('created View table');
    });
  });
};

createDB();
// createTablesToDB();

// CREATE VIEW top_5_voted AS
// SELECT Users.username, Quotes.quote, AVG(Ratings.rating)
// AS avgRating, COUNT(Quotes.quoteID) as rateCount
// FROM Quotes 
// JOIN Users ON Users.userID = Quotes.userID 
// JOIN Ratings ON Quotes.quoteID = Ratings.quoteID
// GROUP BY Quotes.quoteID
// ORDER BY rateCount DESC
// LIMIT 5