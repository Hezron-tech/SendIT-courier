import { LoadOrdersFailure } from './../Actions/orderActions';

import { createFeatureSelector, createReducer, createSelector,on } from "@ngrx/store"
import { Orders } from "src/app/Interface/order"
import * as Actions from "../Actions/orderActions"


export interface OrderState{

    orders:Orders[]
    ordersErrror:string
    orderId:number
    error:string
    deleteMessage:string
    addMessage:string
}


const initialState:OrderState={
    orders:[],
    ordersErrror:'',
    orderId:0,
    error:'',
    deleteMessage:'',
    addMessage:'',

}


const getOrderFeaturesState= createFeatureSelector<OrderState>('order');

export const getOrders= createSelector(
   getOrderFeaturesState, state=> state.orders
)

export const getOrderid=createSelector(
    getOrderFeaturesState,
    state=>state.orderId
  )
 
  export const getOrder=createSelector(
    getOrderFeaturesState,
    getOrderid,
    (state,id)=>state.orders.find(order=>order.id===id)
    
  )


export const OrderReducer = createReducer(
    initialState,

    on(Actions.LoadOrdersSuccess, (state,action):OrderState=>{
        return{...state, orders:action.orders}
    }),

    on(Actions.LoadOrdersFailure, (state,action):OrderState=>{
        return{...state, ordersErrror:action.error}
    }),


    // post orders/reducers
on(Actions.SelectedId, (state,action):OrderState=>{
    return{...state, orderId:action.id}
}),on(Actions.AddOrderSuccess,(state,action):OrderState=>{
    return{...state, addMessage:action.addMessage}
}),
on(Actions.AddOrderFailure,(state,action):OrderState=>{
    return{...state, error:action.error}

}),

    //delete orders
    on(Actions.DeleteOrderSuccess, (state,action):OrderState=>{
        return{...state, deleteMessage:action.deletemessage}
    }),

    on(Actions.DeleteOrderFailure, (state,action):OrderState=>{
        return{...state, error:action.error}
    }),

    



)