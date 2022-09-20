
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
  order$ =this.store.select(getOrder)

//  orderdetails$=this.store.select(getOrder)
  constructor(private router:Router,private route:ActivatedRoute,private store:Store<OrderState>) { }

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{

      this.id=param['id']


      console.log(this.id);
      
      //  this.id=String(id)
 
  })

  this.store.dispatch(Actions.SelectedId({id:this.id}))
  // this.store.dispatch(Actions.LoadOrders())
  //   this.order$=this.store.select(getOrders).pipe(
  //     map(res=>{
  //       console.log(res)

  //       let thisparcel = res.filter(parcel=>parcel.id==this.id)
  //       console.log(thisparcel)
        
  //       return thisparcel
  //     })
  //   )

    }}
