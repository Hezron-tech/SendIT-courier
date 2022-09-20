import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl='http://localhost:5000/users/'
  private httpOptions:any
  
  constructor( private http:HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe:'body'
    }
  }

  loginUser(data:Login):Observable<any>{
    return this.http.post<any>(this.loginUrl+'login/',data)
  }
}
