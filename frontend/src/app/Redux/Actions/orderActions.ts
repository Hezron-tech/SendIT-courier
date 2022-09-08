
import { createAction, props } from "@ngrx/store";
import { Orders } from "src/app/Interface/order";




//loading orders
export const LoadOrders = createAction("LoadOrders")
export const LoadOrdersSuccess = createAction('LoaderOrderSuccess', props<{orders:Orders[]}>())
export const LoadOrdersFailure = createAction('LoaderOrdersFailure', props<{error:string}>())



//delete orders
export const DeleteOrder = createAction("DeleteOrder",
 props<{id:number}>())


export const DeleteOrderSuccess = createAction('DeleteOrderSuccess', props<{deletemessage:string}>())

export const DeleteOrderFailure = createAction('DeleteOrder', props<{error:string}>())
