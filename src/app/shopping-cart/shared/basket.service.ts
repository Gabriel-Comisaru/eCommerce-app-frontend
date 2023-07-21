import { Injectable, Optional } from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { OrderItem } from 'src/app/home-page/shared/orderItem.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(
    private httpClient: HttpClient,
    @Optional() public NavBarComponent: NavBarComponent
  ) {}

  private url = 'http://localhost:8081/api';

  createOrder(productId: number) {
    const url = `${this.url}/orderItems/${productId}?quantity=1`;
    return this.httpClient.post(url, {});
  }

  deleteOrderItem(productId: number) {
    const url = `${this.url}/orderItems/${productId}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }

  getOrderItems(): Observable<any> {
    const url = `${this.url}/orderItems`;
    return this.httpClient.get<any>(url);
  }

  updateOrderQuantity(productId: number, quantity: number) {
    const url = `${this.url}/orderItems/${productId}/quantity?quantity=${quantity}`;
    return this.httpClient.put(url, {}, { responseType: 'text' });
  }
}
