import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  addForms!: FormGroup;
  // registrationSuccess=false

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

    this.addForms=this.fb.group({

      username:[null,[Validators.required]],
      email: [null,[Validators.required,Validators.pattern('^[A-Za-z0-9._%+-]+@thejitu.com$'),]],
      password: [null,[Validators.required, Validators.minLength(6), this.checkPassword] ],

    })
  }


  addUser(){

    console.log('heloo');
    
    console.log(this.addForms.value);
    

  }




  checkPassword(control:FormControl){
    const value=control.value
     const special=/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]+/.test(value)
     return !special? {special:true} :null
 
     
   }
  
}
