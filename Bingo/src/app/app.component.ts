import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewsLetterService } from './services/news-letter.service';

@Component({
  selector: 'b-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  readonly PUBLIC_KEY = 'BIwtoJvtUF4V1uOzH1yejfJwGkoFZmNPP1x7bJp3M3BNRaPoGDNQxbYevVomi_XuYPcVFxLN193gp_fCxgPuL6g';
  title = 'Bingo';
  constructor(private swPush: SwPush, private newsletter: NewsLetterService) {}
  ngOnInit() {
    this.subscribeToNotifications();
  }
  public subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.PUBLIC_KEY
    }).then(sub => this.newsletter.register(sub)).catch(error => console.error('Failed', error));
  }
}
