import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'b-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.scss']
})
export class BingoComponent implements OnInit, OnDestroy {

  public field = [];
  public size: Array<string>;
  public showForm = true;
  public isOwner = false;
  public readyPlayers = [];
  private webSocket: BehaviorSubject<any>;
  constructor(private webSocketProvider: WebsocketService, private route: ActivatedRoute) {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.webSocket = this.webSocketProvider.connect<Array<any>>(`${environment.socketUrl}?sessionId=${sessionId}&playerId=1`);
    this.webSocket.subscribe((data: any) => {
      if(!!data.size) {
        this.size = new Array<string>(data.size * data.size);
        console.log(this.size);
      } else if(!!data.isOwner){
        this.isOwner = true;
      } else if (data.type && data.type === 'ready'){
        this.readyPlayers = data.data;
      } else {
        this.setField(data);
      }
    });
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.webSocket.complete();
  }
  public sendTerms(form: NgForm) {
    if(form.valid) {
      const terms = Object.values(form.form.value);
      this.webSocket.next({type: 'terms', data: terms});
      this.showForm = false;
    }
  }
  public startGame() {
    this.webSocket.next({type: 'start'});
  }
  private setCssVariable(variableName: string, amount: number) {
    document.documentElement.style.setProperty(variableName, `${amount}`);
  }
  private setField(data) {
    this.field = data;
    this.setCssVariable('--bingo-grid-rows', this.field.length);
    this.setCssVariable('--bingo-grid-columns', this.field[0].length);
  }


}
