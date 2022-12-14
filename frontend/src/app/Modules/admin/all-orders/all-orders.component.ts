import { Component, Input, OnInit, Pipe } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of } from 'rxjs';
import { Orders } from 'src/app/Interface/order';
import { getOrders } from 'src/app/Modules/admin/Redux/Reducers/orderReducer';
import { AuthService } from 'src/app/Services/auth.service';
import { OrderService } from 'src/app/Services/order.service';
import * as Actions from '../Redux/Actions/orderActions'

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders$=this.store.select(getOrders)
  
  p:number =1;
  
  errorMessage: string = "";
  filterText:string=''
  constructor(private router:Router, private ordersService:OrderService,private fb:FormBuilder, private store:Store,private route:ActivatedRoute,private authService:AuthService) { 
  }

  ngOnInit(): void {
    this.loadOrders()
  
  }


  loadOrders(){
    
      this.store.dispatch(Actions.LoadOrders()) 

  }


  create(){
this.router.navigate(['admin/create'])
  }


  viewDetails(id:string){
    this.store.dispatch(Actions.SelectedId({id}));
    this.router.navigate([`/admin/view/${id}`],{
       relativeTo:this.route
    })
console.log(id);

  }

  DeleteDetails(id:string){
this.ordersService.deleteOrder(id).subscribe(res=>{
 this.loadOrders()
})
    
  }

  logout(){
this.authService.logout()
this.router.navigate(['/'])
  }

}
