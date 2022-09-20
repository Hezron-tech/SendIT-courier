
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Orders } from 'src/app/Interface/order';
import { getOrder, getOrders, OrderState } from '../../admin/Redux/Reducers/orderReducer';
import * as Actions from '../../admin/Redux/Actions/orderActions'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id!:string
  order$ = new Observable<Orders[]>()

//  orderdetails$=this.store.select(getOrder)
  constructor(private router:Router,private route:ActivatedRoute,private store:Store<OrderState>) { }

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{

      const {id}=param
      this.id=String(id)
    
 
  })
  this.store.dispatch(Actions.LoadOrders())
  this.order$=this.store.select(getOrders).pipe(
    map(res=>{
      console.log(res)

      let thisparcel = res.filter(parcel=>parcel.id==this.id)
      console.log(thisparcel)
      
      return thisparcel
    })
    
  )
    }}
