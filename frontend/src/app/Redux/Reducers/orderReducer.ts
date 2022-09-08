import { LoadOrdersFailure } from './../Actions/orderActions';

import { createFeatureSelector, createReducer, createSelector,on } from "@ngrx/store"
import { Orders } from "src/app/Interface/order"
import * as Actions from "../Actions/orderActions"


export interface OrderState{

    orders:Orders[]
    ordersErrror:string
    error:string
    deleteMessage:string
}


const initialState:OrderState={
    orders:[],
    ordersErrror:'',
    error:'',
    deleteMessage:''

}


const getOrderFeaturesState= createFeatureSelector<OrderState>('order')
export const getOrders= createSelector(
   getOrderFeaturesState, state=> state.orders
)



export const OrderReducer = createReducer(
    initialState,

    on(Actions.LoadOrdersSuccess, (state,action):OrderState=>{
        return{...state, orders:action.orders}
    }),

    on(Actions.LoadOrdersFailure, (state,action):OrderState=>{
        return{...state, ordersErrror:action.error}
    }),


    //delete
    on(Actions.DeleteOrderSuccess, (state,action):OrderState=>{
        return{...state, deleteMessage:action.deletemessage}
    }),

    on(Actions.DeleteOrderFailure, (state,action):OrderState=>{
        return{...state, error:action.error}
    }),

    



)