import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  { path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m=>m.AuthModule)},

  {path:'admin',loadChildren:() => import ('./Modules/admin/admin.module').then(m=>m.AdminModule)},
  {path:'user',loadChildren:() => import ('./Modules/user/user.module').then(m=>m.UserModule)},
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
