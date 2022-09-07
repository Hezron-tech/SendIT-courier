import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  create(){
this.router.navigate(['admin/create'])
  }
  viewDetails(){
    this.router.navigate(['admin/view'])

  }

}
