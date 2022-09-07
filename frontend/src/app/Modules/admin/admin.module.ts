import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';


@NgModule({
  declarations: [
    CreateOrdersComponent,
    AllOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
