import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../Interface/order';
import { Users } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

baseurl='http://localhost:5000'
  
  constructor(private http: HttpClient) { }



  // getOrders(): Observable<Orders[]> {
  //   return this.http.get<Orders[]>(`http://localhost:5000/parcel/all`)
  // }

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.baseurl}/parcel/all`)
  }

  

  getOrderDetails(id:string): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.baseurl}/parcel/${ id}`)
  }


  createOrder(order:Orders): Observable<{message:string}>{
    return this.http.post<{message:string}> (`${this.baseurl}/parcel/new`,order)
    
  }


  
  deleteOrder(id:string): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.baseurl}/parcel/delete/${id}`)
    
  }


 


  }
