import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../Interface/order';
import { Users } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

baseurl='http://localhost:5000'
statusUrl='http://localhost:5000'
token= localStorage.getItem('token') as string
  
  constructor(private http: HttpClient) { }

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.baseurl}/parcel/all`)
  }

  

  getOrderDetails(id:string): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${this.baseurl}/parcel/${ id}`)
  }


  createOrder(order:Orders): Observable<{message:string}>{
    return this.http.post<{message:string}> (`${this.baseurl}/parcel/new`,order,{
      headers:new HttpHeaders ({token:this.token})
    })
    
  }


  
  deleteOrder(id:string): Observable<Orders[]>{
    return this.http.delete<Orders[]>(`${this.baseurl}/parcel/delete/${id}`)
    
  }


 updateStatus(id:string):Observable<Orders[]>{
  return this.http.put<Orders[]>(`${this.statusUrl}/parcel/updatestatus/${id}`,id)
 }


  }
