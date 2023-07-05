import { Injectable } from '@angular/core';
import {MockProductModel} from "../../product-all/shared/mock-product.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  constructor(private httpClient: HttpClient) {}
  private basketItems: MockProductModel[] = [];
  private url = 'http://localhost:8080';


  // createOrder(productId: number) {
  //   const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg1NTQxODYsImV4cCI6MTY4ODU3MjE4Nn0.w2bw3CseLh-pfv-XmGiVdY7JwljAOWGrgBubUVbIiFk';
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const url = `${this.url}/${productId}`;
  //   console.log(url);
  //   // return this.httpClient.post();
  //   return this.httpClient.post(url, {"quantity": 1}, {headers}).subscribe();
  // }
  createOrder(productId: number) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg1OTkyMTIsImV4cCI6MTY4ODYxNzIxMn0.06-Xxyncvwkqi9yeALU2zZQ_Y8Ax_voyTTQgfOVPZpY';
    // let headers = new HttpHeaders({
    //   // "Content-Type": "application/json; charset=utf-8",
    //   Authorization: `Bearer ${token}`
    // });
    // var headers = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg1OTQyOTUsImV4cCI6MTY4ODYxMjI5NX0.ytYQ8C977PI5Fb3Y8j17rvNemdmD-UOyu3qu60F5vzc'}
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
    const url = `${this.url}/api/orderItems/${productId}`; // Assuming the API endpoint is '/api/orderItems/{productId}'
    console.log(url);
    console.log(headers)
    return this.httpClient.post(url, { "quantity": 1 }, { headers: headers }).subscribe();
  }
  getOrderItems(): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg1ODgzODQsImV4cCI6MTY4ODYwNjM4NH0.jmkAynsd0baPjwrQzRD8iAk8GDWXAXFERUl29WDJEP8'
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.url}/api/orderItems`;
    return this.httpClient.get<any>(url, {headers}).pipe()
  }



  addToBasket(product: MockProductModel): void {
    this.basketItems.push(product);
  }

  getBasketItems(): MockProductModel[] {
    return this.basketItems;
  }

  getBasketItemCount(): number {
    return this.basketItems.length;
  }
  log() {
    console.log(this.basketItems);
  }
  deleteFromBasket(index: number): void {
    if (index >= 0 && index < this.basketItems.length) {
      this.basketItems.splice(index, 1);
    }
  }
}
