import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Session } from '../interfaces/session.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  public createSession(name: string, size: number): Promise<any> {
    if(sessionStorage.getItem('player')) {
      return this.http.post(environment.serverUrl + '/api/session/create', {name, size, owner: sessionStorage.getItem('player')}).toPromise();
    } else {
      return Promise.reject('Not Loged on!');
    }
  }
  public getSessions(): Promise<Session[]> {
    return this.http.get<Session[]>(environment.serverUrl + '/api/session').toPromise();
  }
}
