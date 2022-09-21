import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { OrderEffectsService } from '../admin/Redux/Effects/order-effects.service';
import { OrderReducer } from '../admin/Redux/Reducers/orderReducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserOrdersComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature('orders', OrderReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forFeature([OrderEffectsService])
  ]
})
export class UserModule { }
