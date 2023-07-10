import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root' })
export class LoginInterceptor implements HttpInterceptor {
  constructor(private productsService: ProductsService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log('intercepted');
    const token = localStorage.getItem('token');

    if (token) {
      console.log('getting token from local');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // getToken(username,password)
      // hardcode yours
      console.log('no token');
      // this.productsService;
      // .getToken('test1', 'test1')
      // .subscribe((res) => console.log(res?.token));
    }
    // nu pune requesturi in interceptor

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
