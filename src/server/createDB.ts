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

createDB()
