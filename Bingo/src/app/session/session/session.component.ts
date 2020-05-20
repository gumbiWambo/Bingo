import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'b-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(private sessionProvider: SessionService) { }

  ngOnInit(): void {
    const terms = [
      'Beispiel0.0',
      'Beispiel0.1',
      'Beispiel0.2',
      'Beispiel0.3',
      'Beispiel0.4',
      'Beispiel1.0',
      'Beispiel1.1',
      'Beispiel1.2',
      'Beispiel1.3',
      'Beispiel1.4',
      'Beispiel2.0',
      'Beispiel2.1',
      'Beispiel2.2',
      'Beispiel2.3',
      'Beispiel2.4',
      'Beispiel3.0',
      'Beispiel3.1',
      'Beispiel3.2',
      'Beispiel3.3',
      'Beispiel3.4',
      'Beispiel4.0',
      'Beispiel4.1',
      'Beispiel4.2',
      'Beispiel4.3',
      'Beispiel4.4'
    ];
    this.sessionProvider.createSession('GumbisSession', 5, terms);
  }

}
