import { StatusOrderComponent } from './status-order/status-order.component';

import { ViewOrderComponent } from './view-order/view-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'create', component:CreateOrdersComponent},
  {path:'all', component:AllOrdersComponent},
  {path:'view',component:ViewOrderComponent},
 
  {path: 'status',component:StatusOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
