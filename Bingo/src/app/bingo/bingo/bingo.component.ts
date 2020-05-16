import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.scss']
})
export class BingoComponent implements OnInit {

  constructor() { }
  public field = [
    ['Mach es einfach richtig', 'Viele tolle Phrasen', 'Andere Tolle Phrase'],
    ['Ja äh', 'Phrase 2', 'Phrase 3'],
    ['Wie findet ihr das?', 'Phrase 4', 'Phrase 5'],
    ['Wie findet ihr das?', 'Phrase 4', 'Phrase 5']
  ]
  ngOnInit(): void {
    this.setCssVariable('--bingo-grid-rows', this.field.length);
    this.setCssVariable('--bingo-grid-columns', this.field[0].length);
  }
  private setCssVariable(variableName: string, amount: number) {
    document.documentElement.style.setProperty(variableName, `${amount}`);
  }

}
