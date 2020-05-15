
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import {Notification} from './classes/notification'
const app = express();
const server = http.createServer(app);
const notification = new Notification(app);
const wss = new WebSocket.Server({server});

server.listen(1337, '192.168.2.118', () => {
  console.log(`Server started on port ${JSON.stringify(server.address())}`);
});