
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as bodyParser from 'body-parser';
import {Notification} from './classes/notification'
var cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/Bingo'))

const server = http.createServer(app);
const notification = new Notification(app);
const wss = new WebSocket.Server({server});
wss.on('connection', (ws: WebSocket) => {
  const bingoField = [
    ['Mach es einfach richtig', 'Viele tolle Phrasen', 'Andere Tolle Phrase', 'Phrase'],
    ['Ja äh', 'Phrase 2', 'Phrase 3', 'Phrase'],
    ['Wie findet ihr das?', 'Phrase 4', 'Phrase 5', 'Phrase'],
    ['Wie findet ihr das?', 'Phrase 4', 'Phrase 5', 'Phrase']
  ]
  ws.on('message', (data: string) => {
    const parsedData = JSON.parse(data);
    if(!!parsedData.createRoom){

    }
    // notification.sendNotification('Hallo', 'Willkommen');
  });
  ws.send(JSON.stringify(bingoField));
});
app.get('*',(req,res)=> {
  console.log('try to get');
  res.sendfile(__dirname  + '/dist/Bingo/index.html');
});

server.listen(1337, '0.0.0.0', () => {
  console.log(`Server started on port ${JSON.stringify(server.address())}`);
});