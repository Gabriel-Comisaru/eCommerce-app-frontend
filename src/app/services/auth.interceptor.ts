import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { BASE_URL_API } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private apiBaseUrl = 'http://localhost:8081/api';

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('intercepted');
    const token = localStorage.getItem('token');
    const isApiRequest = request.url.startsWith(BASE_URL_API);
    if (token && isApiRequest) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 401) {
        //   localStorage.removeItem('token');
        //   this.authService.redirectToLogin();
        // }
        return throwError(error);
      })
    );
  }
}
