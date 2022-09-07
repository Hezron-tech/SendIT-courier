import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goback(){
    this.router.navigate(['admin/all'])
  }


}
