import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,public authService:AuthService ) { }

  ngOnInit(): void {
  }
  getStarted(){
    this.router.navigate(['auth/register'])
  }


  logout(){
this.authService.logout()
this.router.navigate(['/'])
  }


}
