import { Injectable, Optional } from '@angular/core';
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

  getOrderedItems(): Observable<any> {
    const url = `${this.url}/orders/me/basket`;
    return this.httpClient.get<any>(url);
  }

  getMyOrders(): Observable<any> {
    const url = `${this.url}/orders/me`;
    return this.httpClient.get<any>(url);
  }
}
