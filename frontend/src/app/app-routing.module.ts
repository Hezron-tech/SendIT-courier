import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  { path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m=>m.AuthModule)},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
