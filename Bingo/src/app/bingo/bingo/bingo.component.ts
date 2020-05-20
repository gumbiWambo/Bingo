import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'b-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.scss']
})
export class BingoComponent implements OnInit {

  public field = [];
  constructor(private webSocketProvider: WebsocketService) {
    this.webSocketProvider.connect<Array<any>>(environment.socketUrl).subscribe(data => {
      this.field = data;
      this.setCssVariable('--bingo-grid-rows', this.field.length);
      this.setCssVariable('--bingo-grid-columns', this.field[0].length);
    });
  }
  ngOnInit(): void {
  }
  public sendToWebSocket() {
    this.webSocketProvider.connect<object>('ws://192.168.2.118:1337/').next({message: 'Hi'})
  }
  private setCssVariable(variableName: string, amount: number) {
    document.documentElement.style.setProperty(variableName, `${amount}`);
  }

}
