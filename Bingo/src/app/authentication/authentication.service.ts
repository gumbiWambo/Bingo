import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public registerUser(username, password, email): Promise<{okay: boolean}> {
    return this.http.post<{okay: boolean}>(environment.serverUrl + '/api/usermanagement/register', {username, password, email}).toPromise();
  }
  public loginUser(username, password) {
    return this.http.post(environment.serverUrl + '/api/usermanagement/login', {username, password}).toPromise();
  }
}
