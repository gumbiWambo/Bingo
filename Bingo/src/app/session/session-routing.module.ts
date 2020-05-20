import { NgModule } from '@angular/core';
import { SessionComponent } from './session/session.component';
import { CreationComponent } from './creation/creation.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component: SessionComponent},
  {path: 'create', component: CreationComponent}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SessionRoutingModule { }