import { Application } from "express";
import * as WebSocket from 'ws';
import { Session } from "./session";
export class SessionManager{
  private sessions: Session[] = []
  constructor(private webSocketServer: WebSocket.Server, private app: Application){
    this.webSocketServer.on('connection', (webSocket: WebSocket) => {
      if(this.sessions[0]){
        webSocket.send(JSON.stringify(this.sessions[0].field));
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