import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Orders } from 'src/app/Interface/order';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders$: Observable<Orders[]> = new Observable();
  
  errorMessage: string = "";
  filterText:string=''

  

  constructor(private router:Router, private orders:OrderService,private fb:FormBuilder) { 
  }

  ngOnInit(): void {
    this.loadOrders()
  }


  loadOrders(){
    this.orders$ =this.orders.getOrders().pipe(
      catchError(error =>{
        console.log(error);

        console.log(this.orders$);
        
        this.errorMessage=error.message

        return of([])
        
      })
    );

  }


  create(){
this.router.navigate(['admin/create'])
  }
  viewDetails(){
    this.router.navigate(['admin/view'])

  }

}
