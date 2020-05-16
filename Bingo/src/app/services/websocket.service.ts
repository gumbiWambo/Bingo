import { Injectable } from '@angular/core';
import { WebSocketConnection } from '../interfaces/webSocketConnection.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private connections: WebSocketConnection<any>[] = [];

  constructor() {}

  public connect<T>(url: string): BehaviorSubject<T>{
    let connection: WebSocketConnection<T> = this.connections.find(x => x.url === url);
    if(!connection) {
      connection = {url, socket: this.createConnection(url)};
      this.connections.push(connection);
    }
    return connection.socket;
  }
  private createConnection<T>(url: string): BehaviorSubject<T> {
    const webSocket = new WebSocket(url);
    const observable = new Observable<T>(socketObserver => {
      webSocket.onclose = socketObserver.complete.bind(socketObserver);
      webSocket.onerror = socketObserver.error.bind(socketObserver);
      webSocket.onmessage = (event: MessageEvent) => {
        socketObserver.next(JSON.parse(event.data));
      }
    });
    const observer = {
      next: (data: T) => {
        if(webSocket.readyState === WebSocket.OPEN) {
          webSocket.send(JSON.stringify(data));
        }
      },
      complete: () => webSocket.close(1, 'Connection closed from Frontend')
    }
    return BehaviorSubject.create(observer, observable);
  }
}
