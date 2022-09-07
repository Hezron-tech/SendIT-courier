import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';

import { StatusOrderComponent } from './status-order/status-order.component';


@NgModule({
  declarations: [
    CreateOrdersComponent,
    AllOrdersComponent,
    ViewOrderComponent,
    
    StatusOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
