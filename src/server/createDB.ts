import mysql from 'mysql2';

const createDB = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
  });

  connection.connect((err: any) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      createDBIfNotExist(connection);
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
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: process.env.DATABASE_NAME || 'quote_machine',
  });

  connection.connect((err) => {
    if (err) throw err;
    const createUsersTable =
      'CREATE TABLE Users (username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, userID VARCHAR(255) NOT NULL PRIMARY KEY)';

    const createQuotesTable = `CREATE TABLE Quotes (quote TEXT NOT NULL, quoteID VARCHAR(255) NOT NULL, userID VARCHAR(255) NOT NULL, PRIMARY KEY (quoteID, userID))`;

    const createRatingsTable = `CREATE TABLE Ratings (rating INT  NOT NULL, quoteID VARCHAR(255) NOT NULL, userID VARCHAR(255) NOT NULL, PRIMARY KEY (quoteID, userID))`;

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
  });
};

createDB();
createTablesToDB();

// CREATE VIEW top_5_voted AS
// SELECT Users.username, Quotes.quote, AVG(Ratings.rating)
// AS avgRating, COUNT(Quotes.quoteID) as rateCount
// FROM Quotes 
// JOIN Users ON Users.userID = Quotes.userID 
// JOIN Ratings ON Quotes.quoteID = Ratings.quoteID
// GROUP BY Quotes.quoteID
// ORDER BY rateCount DESC
// LIMIT 5