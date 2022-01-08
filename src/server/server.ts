import express, { Application, Request, Response } from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import { connect } from 'http2';
import { mysqlConnect } from './services/db_service';
import { router } from './routes/router';

export const main = async () => {
  dotenv.config();

  // Connect to db
  await mysqlConnect()
  
  const app = express();
  const server = http.createServer(app);

  app.use(cors());
  app.use(express.json());

  const db = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
  });

  app.use('/', router)

  server.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
    console.log(`Press Ctrl-C to terminate...`);
  });
};

main().catch(console.error);
