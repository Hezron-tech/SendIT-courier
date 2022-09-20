import { UserDetailsComponent } from './user-details/user-details.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from 'src/app/Guards/guard.guard';

const routes: Routes = [
  {
    path: '', canActivate:[GuardGuard],
    children: [
      { path: 'orders', component: UserOrdersComponent },
      { path: 'order/details/:id', component: UserDetailsComponent },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
