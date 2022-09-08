import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild ('form') form!:NgForm;
  constructor(private authService:AuthService,private router:Router) {
    localStorage.setItem("email",'admin@gmail.com')
    localStorage.setItem("password",'1234')
   }

  ngOnInit(): void {
  }

  onSubmit(){

  let email=localStorage.getItem("email")
  let password=localStorage.getItem("password")
    const token = localStorage.setItem('token','qwertyuikolwertyuikl;wertyui')

    const user = this.form.value
    if(user.email===email || user.password===password){

      this.router.navigate(['admin/all'])


    }else{
      this.router.navigate(['user/orders'])
    }
   
    
  }

}
