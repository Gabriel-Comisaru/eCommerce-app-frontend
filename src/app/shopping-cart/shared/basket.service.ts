import { Injectable } from '@angular/core';
import { MockProductModel } from "../../product-all/shared/mock-product.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  constructor(private httpClient: HttpClient) {
  }

  private basketItems: MockProductModel[] = [];
  orderItems: any = [];
  private url = 'http://localhost:8081';

  createOrder(productId: number) {
    const headers = new HttpHeaders()
      .set('Authorization', `${localStorage.getItem('authorization')}`);
    const url = `${this.url}/api/orderItems/${productId}`;
    this.httpClient.post(url, { "quantity": 1 }, { headers: headers }).subscribe();
    this.orderItems.push(productId);
    localStorage.setItem('orderItems', JSON.stringify(this.orderItems));
    return;
  }

  deleteOrderItem(productId: number) {
    const headers = new HttpHeaders()
      .set('Authorization', `${localStorage.getItem('authorization')}`);
    console.log(productId);
    const url = `${this.url}/api/orderItems/${productId}`;
    console.log('url ', url);
    console.log('headers ', headers);
    return this.httpClient.delete(url, { headers: headers });
  }

  getOrderItems(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${localStorage.getItem('authorization')}`);
    const url = `${this.url}/api/orderItems`;
    this.orderItems = this.httpClient.get<any>(url, { headers: headers });
    return this.httpClient.get<any>(url, { headers: headers });
  }

  updateOrderQuantity(productId: number, quantity: number) {
    const headers = new HttpHeaders().set('Authorization', `${localStorage.getItem('authorization')}`);
    const url = `${this.url}/api/orderItems/${productId}/quantity?quantity=${quantity}`;
    console.log(url);
    return this.httpClient.put(url, {}, { headers: headers }).subscribe();
  }
}

// Path: src\app\shopping-cart\shared\mock-product.model.ts
