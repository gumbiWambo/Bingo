import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoComponent } from './bingo/bingo.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [BingoComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BingoComponent
  ]
})
export class BingoModule { }
