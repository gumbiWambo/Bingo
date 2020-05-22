import { Application } from "express";
import * as WebSocket from 'ws';
import { Session } from "./session";
import { IncomingMessage } from "http";
export class SessionManager{
  private sessions: Session[] = []
  constructor(private webSocketServer: WebSocket.Server, private app: Application){
    this.webSocketServer.on('connection', (webSocket: WebSocket, req: IncomingMessage) => {
      const sessionId = req.url?.split('?sessionId=')[1];
      if(!!sessionId) {
        const session = this.sessions.find(x => x.id === sessionId);
        if(session) {
          webSocket.send(JSON.stringify(session.field));
        }
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
      if(req.body.hasOwnProperty('terms') && req.body.hasOwnProperty('name') && req.body.hasOwnProperty('size')) {
        console.log('create');
        const session = new Session(this.generateGuid(), req.body.terms, req.body.name, req.body.size);
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