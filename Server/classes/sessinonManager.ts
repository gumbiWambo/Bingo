import { Application } from "express";
import * as WebSocket from 'ws';
import { Session } from "./session";
export class SessionManager{
  private sessions: Session[] = []
  constructor(private webSocketServer: WebSocket.Server, private app: Application){
    this.webSocketServer.on('connection', (webSocket: WebSocket) => {
      let terms = [
        'Beispiel0.0', 'Beispiel0.1', 'Beispiel0.2', 'Beispiel0.3', 'Beispiel0.4',
        'Beispiel1.0', 'Beispiel1.1', 'Beispiel1.2', 'Beispiel1.3', 'Beispiel1.4',
        'Beispiel2.0', 'Beispiel2.1', 'Beispiel2.2', 'Beispiel2.3', 'Beispiel2.4',
        'Beispiel3.0', 'Beispiel3.1', 'Beispiel3.2', 'Beispiel3.3', 'Beispiel3.4',
        'Beispiel4.0', 'Beispiel4.1', 'Beispiel4.2', 'Beispiel4.3', 'Beispiel4.4',
      ]
      this.sessions.push(new Session('1', terms))
      webSocket.send(JSON.stringify());
    });
  }

}