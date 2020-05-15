
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import {Notification} from './classes/notification'
const app = express();
const server = http.createServer(app);
const notification = new Notification(app);
const wss = new WebSocket.Server({server});

app.get('/',(req,res)=> res.send('Bhoi'));

server.listen(1337, '0.0.0.0', () => {
  console.log(`Server started on port ${JSON.stringify(server.address())}`);
});