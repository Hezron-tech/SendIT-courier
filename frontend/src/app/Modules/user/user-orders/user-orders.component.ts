import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getOrders } from '../../admin/Redux/Reducers/orderReducer';
import * as Actions from '../../admin/Redux/Actions/orderActions'
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  token:string=''
  email:string=''
  ordersreceived:any;
  orderssent:any;
  orders$=this.store.select(getOrders)

  constructor(private router:Router,private store:Store, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.store.dispatch(Actions.LoadOrders());
    this.orders$.subscribe((data)=>{
      console.log(data);
      
      this.email= localStorage.getItem('email')!;
      console.log(this.email);
      this.ordersreceived= data.filter((own)=>{
        return own.receiverEmail==this.email
      });
      this.orderssent= data.filter((own)=>{
        return own.senderEmail==this.email

        
        
      });
    
      
      console.log(this.orderssent);
      
    });
  ;
  }
details(id:string){
  this.store.dispatch(Actions.SelectedId({id}));
this.router.navigate([`/user/order/details/${id}`],{
  relativeTo:this.route
})
  }


  

}
