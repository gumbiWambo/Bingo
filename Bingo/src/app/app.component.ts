import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'b-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Bingo';
  public serverAnswer: string;

  constructor(private http: HttpClient) { }

  public ngOnInit() {
    this.http.get<{ message: string }>('http://localhost:3000')
      .toPromise()
      .then(value => {
        this.serverAnswer = value.message;
      });
  }
}
