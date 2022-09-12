import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateOrdersComponent } from './create-orders/create-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';

import { StatusOrderComponent } from './status-order/status-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/Pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { OrderEffectsService } from './Redux/Effects/order-effects.service';
import { OrderReducer } from './Redux/Reducers/orderReducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';





@NgModule({
  declarations: [
    CreateOrdersComponent,
    AllOrdersComponent,
    ViewOrderComponent,
    SearchPipe,
    StatusOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule,
    StoreModule.forFeature('orders', OrderReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forFeature([OrderEffectsService])
    
    
  ]
})
export class AdminModule { }
