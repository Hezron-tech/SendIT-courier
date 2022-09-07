import { UpdateOrderComponent } from './update-order/update-order.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'create', component:CreateOrdersComponent},
  {path:'all', component:AllOrdersComponent},
  {path:'view',component:ViewOrderComponent},
  {path: 'update',component:UpdateOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
