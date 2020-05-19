
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as bodyParser from 'body-parser';
import {Notification} from './classes/notification'
import { SessionManager } from './classes/sessinonManager';
var cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/Bingo'))

const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const notification = new Notification(app);
const sessionManager = new SessionManager(wss, app);
app.get('/',(req,res)=> {
  res.send('Hallo Hans!');
});

server.listen(1337, '0.0.0.0', () => {
  console.log(`Server started on port ${JSON.stringify(server.address())}`);
});