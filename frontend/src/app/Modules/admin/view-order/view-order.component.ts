

import { getOrder } from '../Redux/Reducers/orderReducer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrderState, getOrders } from 'src/app/Modules/admin/Redux/Reducers/orderReducer';
import * as Actions from '../Redux/Actions/orderActions'
import { map, Observable } from 'rxjs';
import { Orders } from 'src/app/Interface/order';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  id!:string
  order$ = new Observable<Orders[]>()

  constructor(private route:ActivatedRoute,private store:Store<OrderState>,private router:Router,private orderService:OrderService) { }

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
  
  }

  
  update(id:string){
    this.orderService.updateStatus(id).subscribe( res=>{

      this.store.dispatch(Actions.LoadOrders())
      
      console.log(res);

      
    })

  }

  goback(){
    this.router.navigate(['admin/all'])
  }


}
