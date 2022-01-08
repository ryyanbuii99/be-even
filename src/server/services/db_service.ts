import mysql from 'mysql2';

export const mysqlConnect = async () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: process.env.DATABASE_NAME || 'quote_machine',
  });

  connection.connect((err: any) => {
    if (err) throw err;
    createTablesToDB(connection);
    console.log('connected');
  });
};

const createTablesToDB = (connection: mysql.Connection) => {
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
};
