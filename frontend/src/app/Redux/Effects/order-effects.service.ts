import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map,mergeMap, of } from 'rxjs';
import { OrderService } from 'src/app/Services/order.service';

import * as OrdersAction from '../Actions/orderActions'

@Injectable({
  providedIn: 'root'
})
export class OrderEffectsService {

  constructor(private actions:Actions,private orderService:OrderService ) { }

  loadOrder = createEffect(()=>{
    return this.actions.pipe(
      ofType(OrdersAction.LoadOrders),
      concatMap(()=>this.orderService.getOrders().pipe(
        map(orders=>OrdersAction.LoadOrdersSuccess({orders})),
        catchError(error=>of(OrdersAction.LoadOrdersFailure({error:error.message})))
      ))
    )
  })

  deleteOrder = createEffect(()=>{
    return this.actions.pipe(
      ofType(OrdersAction.DeleteOrder),
      mergeMap(action=>this.orderService.deleteOrder(action.id).pipe(
        map(res=>OrdersAction.DeleteOrderSuccess({deletemessage:res.message})),
        catchError(error=>of(OrdersAction.DeleteOrderFailure({error:error.message})))
      ))
    )
  })

  
   
  
}
