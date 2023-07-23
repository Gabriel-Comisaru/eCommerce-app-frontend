import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderItem } from '../home-page/shared/orderItem.model';
import { DetailedOrder, Order } from '../home-page/shared/order.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiBaseURL = 'http://localhost:8081/api';

  public loggedUser = new Subject<User>();

  getLoggedUserObservable(): Observable<User> {
    return this.loggedUser.asObservable();
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${this.apiBaseURL}/users/loggedInUser`).pipe(
      tap((res) => {
        this.loggedUser.next(res);
        localStorage.setItem('currentUser', JSON.stringify(res));
      })
    );
  }

  getUserOrders(): Observable<Order[]> {
    const url = `${this.apiBaseURL}/orders/me`;
    return this.http.get<Order[]>(url);
  }

  getDetailedUserOrders(): Observable<DetailedOrder[]> {
    const url = `${this.apiBaseURL}/orders/me/lazy`;
    return this.http.get<DetailedOrder[]>(url);
  }
}
