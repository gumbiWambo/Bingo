import { Player } from "./player";

export class Session{
  private players: Player[] = [];

  public field: Array<any>;
  constructor(public id: string, terms: string[], public name: string, size: number){
    if(terms.length >= size * size){
      const field = [];
      for(let i = 0; i <= size; ++i) {
        const fieldRow = [];
        for(let j = 0; j<= size; ++j) {
          fieldRow.push(terms[j + i]);
        }
        field.push(fieldRow);
      }
      this.field = field;
    }
  }
  public addPlayer(player: Player): boolean {
    this.players.push(player);
    return true;
  }
}