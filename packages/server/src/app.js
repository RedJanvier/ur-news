// eslint-disable-next-line no-unused-vars
import 'colors';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import '@babel/polyfill';
import helmet from 'helmet';
import morgan from 'morgan';
import fileUploader from 'express-fileupload';
import express, { json, urlencoded } from 'express';
import './utils/eventEmitters';
import index from './routes/index';
import socket from './utils/socket';
import handleChat from './utils/chat';
import database from './config/database';
import errorHandler from './middlewares/error';

// Initialization
database();
const app = express();
const server = http.createServer(app);
const { PORT, NODE_ENV } = process.env;

app.use(cors());
app.use(json());
app.use(helmet());
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(fileUploader({ useTempFiles: true }));
app.use('/api/v1/', index);
app.use(errorHandler);

// Server Listeners
handleChat();
socket.socketFunction.socketStartUp(server);
server.listen(
  PORT,
  console.log(
    `Server Started in ${NODE_ENV} mode at http://localhost:${PORT}/api/v1/`
      .yellow
  )
);

export { server, app };
