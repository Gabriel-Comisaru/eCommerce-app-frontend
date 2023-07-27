import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetailedOrder, Order } from '../home-page/shared/order.model';
import { BASE_URL_API } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public loggedUser = new Subject<User>();

  getLoggedUserObservable(): Observable<User> {
    return this.loggedUser.asObservable();
  }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL_API}/users/info/me`).pipe(
      tap((res) => {
        this.loggedUser.next(res);
        localStorage.setItem('currentUser', JSON.stringify(res));
      })
    );
  }

  getUserOrders(): Observable<Order[]> {
    const url = `${BASE_URL_API}/orders/me`;
    return this.http.get<Order[]>(url);
  }

  getDetailedUserOrders(): Observable<DetailedOrder[]> {
    const url = `${BASE_URL_API}/orders/me/lazy`;
    return this.http.get<DetailedOrder[]>(url);
  }
}
