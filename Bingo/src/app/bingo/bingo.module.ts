import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoComponent } from './bingo/bingo.component';



@NgModule({
  declarations: [BingoComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BingoComponent
  ]
})
export class BingoModule { }
