import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'b-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  constructor(private sessionProvider: SessionService, private router: Router) { }
  public actualStep = 1;
  private newSession = {
    name: null,
    size: null
  }
  ngOnInit(): void {
  }
  public nextStep() {
    if(this.actualStep + 1 <= 2) {
      ++this.actualStep;
    } else if(this.newSession.name && this.newSession.size){
      this.sessionProvider.createSession(this.newSession.name, this.newSession.size).then((session) => {
        this.router.navigate([`/bingo/${session.id}`]);
      });
    }
  }
  public submitName(form: NgForm) {
    if(form.valid) {
      this.newSession.name = form.value.name;
      this.nextStep();
    } else {
      console.error('Form invalid');
    }
  }
  public submitSize(form: NgForm) {
    if(form.valid) {
      this.newSession.size = form.value.size;
      this.nextStep();
    } else {
      console.error('Form invalid');
    }
  }

}
