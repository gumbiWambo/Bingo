import { BehaviorSubject } from 'rxjs';

export interface WebSocketConnection<T>{
  url: string;
  socket: BehaviorSubject<T>
}