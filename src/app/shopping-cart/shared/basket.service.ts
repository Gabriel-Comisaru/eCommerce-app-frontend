import { Injectable } from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  constructor(private httpClient: HttpClient) {}
  private basketItems: Product[] = [];
  orderItems: any   = [];
  private url = 'http://localhost:8081/api';


  createOrder(productId: number) {
    const url = `${this.url}/orderItems/${productId}`;
    return this.httpClient.post(url, { "quantity": 1 }).subscribe()
    // this.orderItems.push(productId)
    // localStorage.setItem('orderItems', JSON.stringify(this.orderItems))

  }

  deleteOrderItem(productId: number) {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg2NTc1MzksImV4cCI6MTY4ODY3NTUzOX0.q4tXfuEwGPIn9PsaBQlX_Q_PKI9P3NTsXCLE6O0RXyw';
    const headers = new HttpHeaders()
      .set('access-control-allow-origin',"http://localhost:4200")
      .set('access-control-allow-origin',"http://localhost:8081")
    console.log(productId)
    const url = `${this.url}/orderItems/${productId}`;
    // console.log('url ', url)
    // console.log('headers ', headers)
    return this.httpClient.delete(url, {headers}).subscribe()

  }

  getOrderItems(): Observable<any> {
    const url = `${this.url}/orderItems`;
    this.orderItems = this.httpClient.get<any>(url);
    return this.httpClient.get<any>(url)
  }


  updateOrderQuantity(productId: number, quantity: number) {
    const url = `${this.url}/api/orderItems/${productId}/quantity?quantity=${quantity}`;
    // console.log(url)
    return this.httpClient.put(url, {}).subscribe();
  }



}
