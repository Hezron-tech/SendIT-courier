import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild ('form') form!:NgForm;
  constructor(private loginService:LoginService,private router:Router) {
  
   }

  ngOnInit(): void {
  }



  onSubmit(){

    console.log(this.form.value);

    if(this.form.valid){
    this.loginService.loginUser(this.form.value).subscribe(response=>{

      localStorage.setItem('token',response.token)

      localStorage.setItem('username',response.user.username)
      localStorage.setItem('email',response.user.email)

      console.log(response);
      

      console.log(response.user.role);
      
      if(response.user.role==='Admin'){
        this.router.navigate(['/admin/all'])

      }
      else{
        this.router.navigate(['/user/orders'])
      }
      
     
     
    })
 
   
    
  }

  }}
