

import { getOrder } from '../Redux/Reducers/orderReducer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrderState, getOrders } from 'src/app/Modules/admin/Redux/Reducers/orderReducer';
import * as Actions from '../Redux/Actions/orderActions'
import { map, Observable } from 'rxjs';
import { Orders } from 'src/app/Interface/order';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  id!:string
  order$ = new Observable<Orders[]>()

  constructor(private route:ActivatedRoute,private store:Store<OrderState>,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{

     const {id}=param
      this.id=String(id)
    //  console.log(id);
     
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
    // this.store.dispatch(Actions.SelectedId({id:this.id}))
    // this.order$.subscribe(order=>{
    //   console.log(order);
      
    // })
    

  }

  goback(){
    this.router.navigate(['admin/all'])
  }


}
