import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, concatMap, map, Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ProductsService } from '../home-page/shared/products.service';
import { RegisterFields } from '../models/register.model';
import { OrderItem } from '../home-page/shared/orderItem.model';
import { Order } from '../home-page/shared/order.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8081';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService,
    private productsService: ProductsService
  ) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  login(username: string, password: string): Observable<any> {
    const formData: any = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.httpClient
      .post<any>(`${this.baseUrl}/auth/login`, formData)
      .pipe(
        map((data) => {
          localStorage.setItem('token', data.token);

          const newLocal = this;
          newLocal.router.navigate(['/']);

          this.router.navigate(['/']);
          localStorage.setItem('admin', 'false');
          return data;
        })
      );
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    // favoriteProducts doesn t update in real time
    localStorage.removeItem('favoriteProducts');
    this.userService.loggedUser.next({});

    this.productsService.favoriteProductsObservable.next({
      productAction: 'reset',
    });

    this.redirectToLogin();
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }
  register(registerCredentials: RegisterFields): Observable<RegisterFields> {
    const formData = new FormData();
    const url = `${this.baseUrl}/auth/register`;
    for (const [key, value] of Object.entries(registerCredentials)) {
      formData.append(key, value);
    }

    return this.httpClient.post<any>(url, formData).pipe(
      map((data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
        return data;
      })
    );
  }
}
