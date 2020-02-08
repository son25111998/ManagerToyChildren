import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HomeListComponent}from '../app/homepageweb/home-list/home-list.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: './am/am.module#AmModule'},
      { path: 'auth', loadChildren: './authentication/auth-routing.module#AuthRoutingModule' },
      { path: 'homepage', component: HomeListComponent },
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
