import { Player } from "./player";

export class Session{
  private players: Player[];
  constructor(public id: string, terms: string[]){}
  public addPlayer(player: Player): boolean {
    this.players.push(player);
    return true;
  }
}