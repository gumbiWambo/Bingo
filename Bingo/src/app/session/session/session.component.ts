import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/interfaces/session.interface';

@Component({
  selector: 'b-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  public sessions: Session[] = [];
  constructor(private sessionProvider: SessionService) { }

  ngOnInit(): void {
    this.sessionProvider.getSessions().then((sessions: Session[]) => {
      this.sessions = sessions;
    });
  }

}
