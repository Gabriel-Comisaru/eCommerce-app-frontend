import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { MockProductsService } from './mock-products.service';

@Injectable({ providedIn: 'root' })
export class LoginInterceptor implements HttpInterceptor {
  constructor(private productsService: MockProductsService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('intercepted');
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // getToken(username,password)
      // hardcode yours
      this.productsService
        .getToken('test1', 'test1')
        .pipe(tap((res) => localStorage.setItem('token', res)));
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
        }
        return throwError(error);
      })
    );
  }
}
