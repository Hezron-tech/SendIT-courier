import { UserDetailsComponent } from './user-details/user-details.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', children:[
    {path:'orders',component:UserOrdersComponent},
    {path:'details',component:UserDetailsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
