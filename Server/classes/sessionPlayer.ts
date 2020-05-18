import { FieldPart } from "./fieldPart";
import { Player } from "./player";

export class SessionPlayer extends Player{
  public field: FieldPart[];
  constructor(playerId: string, playerName, field: FieldPart[]) {
    super(playerId, playerName);
    this.field = field;
  }
}