

import { getOrder } from '../Redux/Reducers/orderReducer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrderState } from 'src/app/Modules/admin/Redux/Reducers/orderReducer';
import * as Actions from '../Redux/Actions/orderActions'

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  id!:number
  order$ = this.store.select(getOrder)

  constructor(private route:ActivatedRoute,private store:Store<OrderState>,private router:Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((param)=>{
      this.id=+param['id']
    })
    this.store.dispatch(Actions.SelectedId({id:this.id}))
    this.order$.subscribe(order=>{
      console.log(order);
      
    })
    

  }

  goback(){
    this.router.navigate(['admin/all'])
  }


}
