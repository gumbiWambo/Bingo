import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsLetterService {

  constructor(private http: HttpClient) { }
  public register(sub: any): Promise<any>{
    return this.http.post('http://192.168.2.118//api/newsletter', sub).toPromise();
  }
}
