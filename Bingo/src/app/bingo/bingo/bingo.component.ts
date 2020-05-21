import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'b-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.scss']
})
export class BingoComponent implements OnInit, OnDestroy {

  public field = [];
  private webSocket: BehaviorSubject<Array<any>>;
  constructor(private webSocketProvider: WebsocketService, private route: ActivatedRoute) {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.webSocket = this.webSocketProvider.connect<Array<any>>(`${environment.socketUrl}?sessionId=${sessionId}`);
    this.webSocket.subscribe(data => {
      this.field = data;
      this.setCssVariable('--bingo-grid-rows', this.field.length);
      this.setCssVariable('--bingo-grid-columns', this.field[0].length);
    });
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.webSocket.complete();
  }
  public sendToWebSocket() {
    this.webSocket.next(['Message']);
  }
  private setCssVariable(variableName: string, amount: number) {
    document.documentElement.style.setProperty(variableName, `${amount}`);
  }

}
