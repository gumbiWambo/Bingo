import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
