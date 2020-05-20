import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './session/session/session.component';
import { BingoComponent } from './bingo/bingo/bingo.component';
import { SessionModule } from './session/session.module';


const routes: Routes = [
  {path: '', redirectTo: 'session', pathMatch: 'full'},
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then(module => module.SessionModule)},
  {path: 'bingo', component: BingoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
