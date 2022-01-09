import express, { Application, Request, Response } from 'express';
import session from 'express-session';
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
  await mysqlConnect();

  const app = express();
  const server = http.createServer(app);

  app.use(cors());
  app.use(express.json());

  const sessionOptions: session.SessionOptions = {
    name: 'bajskorv',
    secret: 'kalle',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: new Date(Date.now() + 900000),
      sameSite: 'lax',
    },
  };
  app.use(session(sessionOptions));
  app.use(function (req: any, res: any, next) {
    res.locals.user = req.session.user;
    next();
  });

  app.use('/', router);

  server.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
    console.log(`Press Ctrl-C to terminate...`);
  });
};

main().catch(console.error);
