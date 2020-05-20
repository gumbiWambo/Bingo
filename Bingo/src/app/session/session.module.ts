import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session/session.component';
import { CreationComponent } from './creation/creation.component';
import { SessionRoutingModule } from './session-routing.module';




@NgModule({
  declarations: [SessionComponent, CreationComponent],
  imports: [
    CommonModule,
    SessionRoutingModule
  ],
  exports: [
    SessionComponent
  ]
})
export class SessionModule { }
