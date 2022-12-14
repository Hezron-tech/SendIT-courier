
import { createAction, props } from "@ngrx/store";
import { Orders } from "src/app/Interface/order";
import { Users } from "src/app/Interface/user";


export const SelectedId= createAction('SelectedId', props<{id:string}>())

//loading orders


export const LoadOrders = createAction("LoadOrders")
export const LoadOrdersSuccess = createAction('LoaderOrderSuccess', props<{orders:Orders[]}>())
export const LoadOrdersFailure = createAction('LoaderOrdersFailure', props<{error:string}>())


//post orders
export const AddOrder= createAction('AddOrder',props<{newOrder:Orders}>())
export const AddOrderSuccess= createAction('AddOrderSuccess',props<{addMessage:string}>())
export const AddOrderFailure= createAction('AddOrderFailure',props<{error:string}>())



//delete orders
export const DeleteOrder = createAction("DeleteOrder",props<{id:string}>())
export const DeleteOrderSuccess = createAction('DeleteOrderSuccess', props<{deletemessage:string}>())
export const DeleteOrderFailure = createAction('DeleteOrder', props<{error:string}>())


//add users
