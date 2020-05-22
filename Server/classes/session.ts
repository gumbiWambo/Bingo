import { Player } from "./player";
import * as WebSocket from 'ws';
export class Session{
  private players: Player[] = [];
  private readyStatePlayers: {name: string, ready: boolean}[] = [];
  private connections: {playerId: string, field: Array<Array<string>>, socket: WebSocket}[] = [];

  public field: Array<any>;
  constructor(public id: string, public name: string, private size: number, private ownerId: string){

  }
  public addConnection(ws: WebSocket, playerId: string) {
    if(this.connections.find(x => x.playerId === playerId)) {
      const establishedConnection = this.connections.find(x => x.playerId === playerId);
      establishedConnection.socket = ws;
      establishedConnection.socket.send(JSON.stringify(establishedConnection.field));
    }
    ws.send(JSON.stringify({size: this.size}));
    const connection = {playerId, field: undefined, socket: ws};
    const readyEntry = {name: playerId, ready: false}
    this.readyStatePlayers.push(readyEntry);
    this.sendOwnerPlayerReady();
    if(playerId === this.ownerId) {
      connection.socket.send(JSON.stringify({isOwner: true}));
    }
    ws.on('message', (data: string) => {
      const parsedData = JSON.parse(data);
      if(parsedData.type === 'terms') {
        connection.field = this.createField(parsedData.data);
        readyEntry.ready = true;
        this.sendOwnerPlayerReady();
      } else if(playerId === this.ownerId && parsedData.type === 'start') {
        this.sendFields();
      }
    });
    this.connections.push(connection);
  }
  public addPlayer(player: Player): boolean {
    this.players.push(player);
    return true;
  }
  private sendOwnerPlayerReady() {

    this.connections.find(x => x.playerId === this.ownerId)?.socket.send(JSON.stringify({type: 'readyState', data: this.readyStatePlayers}));
  }
  private sendFields() {
    this.connections.forEach(connection => {
      connection.socket.send(JSON.stringify(connection.field));
    });
  }
  private createField(terms: Array<string>): Array<Array<string>> {
    terms = this.randomizeArray(terms);
    const field = [];
    for(let i = 0; i < this.size; ++i) {
      const fieldRow = []
      for(let j = 0; j < this.size; ++j) {
        fieldRow.push(terms[i * this.size + j]);
      }
      field.push(fieldRow);
    }
    return field;
  }
  private randomizeArray(terms: Array<string>): Array<string>{
    const squaredSize = this.size * this.size;
    let iterations = Math.floor(squaredSize * (Math.random() * 10 + 1))
    while(iterations > 0){
      const random = Math.floor(Math.random() * squaredSize);
      const random1 = Math.floor(Math.random() * squaredSize);
      [terms[random], terms[random1]]=[terms[random1],terms[random]]
      --iterations;
    }
    return terms;
  }
}