import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../Interface/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

baseurl='http://localhost:3000'
  
  constructor(private http: HttpClient) { }



  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.baseurl}/parcels`)
  }

}
