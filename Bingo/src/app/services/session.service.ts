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
    return this.http.post(environment.serverUrl + '/api/session/create', {name, size, owner: '1'}).toPromise();
  }
  public getSessions(): Promise<Session[]> {
    return this.http.get<Session[]>(environment.serverUrl + '/api/session').toPromise();
  }
}
