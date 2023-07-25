import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { BASE_URL_API } from 'src/app/settings';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(
    private httpClient: HttpClient,
    @Optional() public NavBarComponent: NavBarComponent
  ) {}

  private url = `${BASE_URL_API}`;

  finishOrder(orderId: number, status: string): Observable<any> {
    const url = `${this.url}/orders/${orderId}?status=${status}`;
    return this.httpClient.put(url, {}, { responseType: "json" });
  }

  getOrder(orderId: number): Observable<any> {
    const url = `${this.url}/orders/${orderId}`;
    return this.httpClient.get<any>(url);
  }

  getOrderForMe() {
    const url = `${this.url}/orders`;
    return this.httpClient.get(url, { responseType: 'json' });
  }

  deleteOrderItem(productId: number) {
    const url = `${this.url}/orderItems/${productId}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }

  getOrderedItems(): Observable<any> {
    const url = `${this.url}/orders/me/basket`;
    return this.httpClient.get<any>(url);
  }

  getMyOrders(): Observable<any> {
    const url = `${this.url}/orders/me`;
    return this.httpClient.get<any>(url);
  }
  updateOrderQuantity(productId: number, quantity: number) {
    const url = `${this.url}/orderItems/${productId}/quantity?quantity=${quantity}`;
    return this.httpClient.put(url, {}, { responseType: 'text' });
  }


}
