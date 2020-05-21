import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session/session.component';
import { CreationComponent } from './creation/creation.component';
import { SessionRoutingModule } from './session-routing.module';
import { FormsModule } from '@angular/forms';
import { TermsComponent } from './terms/terms.component'



@NgModule({
  declarations: [SessionComponent, CreationComponent, TermsComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    FormsModule
  ],
  exports: [
    SessionComponent
  ]
})
export class SessionModule { }
