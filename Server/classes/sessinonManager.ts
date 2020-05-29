import { Application } from "express";
import * as WebSocket from 'ws';
import { Session } from "./session";
import { IncomingMessage } from "http";
export class SessionManager{
  private sessions: Session[] = []
  constructor(private webSocketServer: WebSocket.Server, private app: Application){
    this.webSocketServer.on('connection', (webSocket: WebSocket, req: IncomingMessage) => {
      console.log(req.url);
      const queryFragments = req.url?.split('?')[1].split('&')
      const sessionId = queryFragments.find(x => x.includes('sessionId'))?.split('=')[1] ;
      const playerId = queryFragments.find(x => x.includes('playerId'))?.split('=')[1];
      const session = this.sessions.find(x => x.id === sessionId);
      if(!!session) {
          session.addConnection(webSocket, playerId);
      } else {
        webSocket.close();
      }
    });
    this.initApp();
  }
  private initApp() {
    this.app.put('/api/session/leave', (req, res) => {

    });
    this.app.post('/api/session/create', (req, res) => {
      if(req.body.hasOwnProperty('name') && req.body.hasOwnProperty('size') && req.body.hasOwnProperty('owner')) {
        const session = new Session(this.generateGuid(), req.body.name, req.body.size, req.body.owner);
        this.sessions.push(session);
        res.send(JSON.stringify(session));
      } else {
        res.sendStatus(400);
      }
    });
    this.app.get('/api/session/', (req, res) => {
      res.send(JSON.stringify(this.sessions));
    });
  }
  private generateGuid(): string{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}