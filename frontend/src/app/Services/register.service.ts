import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apirUrl='http://localhost:5000/users/register'
  userUrl='http://localhost:5000/users/all'

  constructor(private http:HttpClient) { }

  registerUser(user:Users):Observable<Users>{
    return this.http.post<Users>(`${this.apirUrl}`,user)
  }


  getUsers():Observable<Users[]>{
    return this.http.get<Users[]>(this.userUrl)
  }
}
