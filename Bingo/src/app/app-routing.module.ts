import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BingoComponent } from './bingo/bingo/bingo.component';
import { SessionModule } from './session/session.module';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import { AuthenticationGuard } from './guards/authentication.guard';


const routes: Routes = [

  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then(module => module.SessionModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'bingo/:sessionId',
    component: BingoComponent ,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
