import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.css']
})
export class CreateOrdersComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  back(){
this.router.navigate(['admin/all'])
  }
}
