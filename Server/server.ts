
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as bodyParser from 'body-parser';
import {Notification} from './classes/notification'
var cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
const notification = new Notification(app);
const wss = new WebSocket.Server({server});

server.listen(1337, 'localhost', () => {
  console.log(`Server started on port ${JSON.stringify(server.address())}`);
});