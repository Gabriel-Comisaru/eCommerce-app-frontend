import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { RegisterFields } from '../models/register.model';
import { BASE_URL } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${BASE_URL}`;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService
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

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('favoriteProducts');
    this.userService.loggedUser.next({});

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
