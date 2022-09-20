import { RegisterService } from './../../../Services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Users } from 'src/app/Interface/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  addForms!: FormGroup;
  registrationSuccess=false

  constructor(private fb:FormBuilder,private router:Router,private registerService:RegisterService) { }

  ngOnInit(): void {

    this.addForms=this.fb.group({

      username:[null,[Validators.required]],
      email: [null,[Validators.required,Validators.required]],
      password: [null,[Validators.required, Validators.minLength(6), this.checkPassword] ],

    })
  }

    addUser(){

      console.log('heloo');
      
      if(this.addForms.valid){
      const  newRegistration:Users = this.addForms.value;
      console.log(newRegistration);
      
     this.registerService.registerUser(newRegistration).subscribe(
       (response) => {
  
        console.log(response);
        this.registrationSuccess=true
        if(this.registrationSuccess){
          this.router.navigate(['auth/login'])
  
        }else{
          alert('user already registered')
        }
        
        
       },
       (error) => console.log(error),
       () => console.log("User added successfully")
       
       
     );
      }
    }
  checkPassword(control:FormControl){
    const value=control.value
     const special=/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]+/.test(value)
     return !special? {special:true} :null
 
     
   }
  
}
