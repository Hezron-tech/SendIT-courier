import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Actions from '../../admin/Redux/Actions/orderActions'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  addForms!: FormGroup;
  // registrationSuccess=false

  constructor(private fb:FormBuilder,private store:Store,private router:Router) { }

  ngOnInit(): void {

    this.addForms=this.fb.group({

      username:[null,[Validators.required]],
      email: [null,[Validators.required,Validators.pattern('^[A-Za-z0-9._%+-]+@thejitu.com$'),]],
      password: [null,[Validators.required, Validators.minLength(6), this.checkPassword] ],

    })
  }


  
    addUser(){

     
      // this.router.navigate(['/admin/login'])
    
    }
   
   
    

  




  checkPassword(control:FormControl){
    const value=control.value
     const special=/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]+/.test(value)
     return !special? {special:true} :null
 
     
   }
  
}
