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
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg2NzM2NjQsImV4cCI6MTY4ODY5MTY2NH0.VBqxqIiD6zwRlu4B-DezHP9kDDAsDp1WCS27CnXBt_g';

  // createOrder(productId: number) {
  //   const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg1NTQxODYsImV4cCI6MTY4ODU3MjE4Nn0.w2bw3CseLh-pfv-XmGiVdY7JwljAOWGrgBubUVbIiFk';
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const url = `${this.url}/${productId}`;
  //   console.log(url);
  //   // return this.httpClient.post();
  //   return this.httpClient.post(url, {"quantity": 1}, {headers}).subscribe();
  // }
  createOrder(productId: number) {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg2NTc1MzksImV4cCI6MTY4ODY3NTUzOX0.q4tXfuEwGPIn9PsaBQlX_Q_PKI9P3NTsXCLE6O0RXyw';
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    const url = `${this.url}/api/orderItems/${productId}`; // Assuming the API endpoint is '/api/orderItems/{productId}'
    console.log(url);
    console.log(headers)
    return this.httpClient.post(url, { "quantity": 1 }, { headers: headers }).subscribe();
  }

  deleteOrderItem(productId: number) {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg2NTc1MzksImV4cCI6MTY4ODY3NTUzOX0.q4tXfuEwGPIn9PsaBQlX_Q_PKI9P3NTsXCLE6O0RXyw';
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    console.log(productId)
    const url = `${this.url}/api/orderItems/${productId}`; // Assuming the API endpoint is '/api/orderItems/{productId}'
    console.log('url ', url)
    console.log('headers ', headers)
    return this.httpClient.delete(url, { headers: headers }).subscribe();

  }

  getOrderItems(): Observable<any> {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg2NTc1MzksImV4cCI6MTY4ODY3NTUzOX0.q4tXfuEwGPIn9PsaBQlX_Q_PKI9P3NTsXCLE6O0RXyw'
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.url}/api/orderItems`;
    return this.httpClient.get<any>(url, { headers: headers })
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
