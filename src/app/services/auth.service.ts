import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8081';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // register(data: User): Observable<User> {
  //   return this.httpClient.post<UserInfo>(`${this.baseUrl}/auth/register`, data);
  // }

  login(username: string, password: string): Observable<any> {
    const formData: any = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    console.log('auth service');
    return this.httpClient
      .post<any>(`${this.baseUrl}/auth/login`, formData)
      .pipe(
        map((data) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/']);
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
    this.userService.loggedUser.next({});
    this.redirectToLogin();
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }
  register(
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    const formData: any = new FormData();
    const url = `${this.baseUrl}/auth/register`;
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    return this.httpClient.post<any>(url, formData).pipe(
      map((data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
        return data;
      })
    );
  }
}
