import { Player } from "./player";

export class Session{
  private players: Player[] = [];

  public field: Array<any>;
  constructor(public id: string, terms: string[], public name: string, size: number){
    if(terms.length >= size * size){
      const field = [];
      for(let i = 0; i < size; ++i) {
        const fieldRow = [];
        for(let j = i * size; j< (i + 1) *size; ++j) {
          fieldRow.push(terms[j]);
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