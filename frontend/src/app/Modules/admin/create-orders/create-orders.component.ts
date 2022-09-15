import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as Actions from '../Redux/Actions/orderActions'

@Component({
  selector: 'app-create-orders',
  templateUrl: './create-orders.component.html',
  styleUrls: ['./create-orders.component.css']
})
export class CreateOrdersComponent implements OnInit {

  projectForms!: FormGroup;

  constructor(private router:Router, private fb:FormBuilder,private store:Store) { }

  ngOnInit(): void {

    this.projectForms=this.fb.group({

      packageName:[null,[Validators.required]],
      packageId:[null,[Validators.required]],
      destination:[null,[Validators.required]],
      sender:[null,[Validators.required]],
      receiver:[null,[Validators.required]], 
      price:[null,[Validators.required]], 
      status:[null,[Validators.required]], 
      weight:[null,[Validators.required]],
      date:[null,[Validators.required]],   

    })

    this.projectForms.get('weight')?.valueChanges.subscribe(res=>{
      this.projectForms.get('price')!.setValue(res*100)
    })
  }


  onSubmit(){

    console.log(this.projectForms.value);
    if(this.projectForms.valid){
      this.store.dispatch(Actions.AddOrder({newOrder:this.projectForms.value}))
      this.store.dispatch(Actions.LoadOrders())
       this.router.navigate(['admin/all'])
      
      
    }

    }

   

  back(){
this.router.navigate(['admin/all'])
  }
}
