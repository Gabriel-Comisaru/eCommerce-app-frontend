import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('intercepted');
    const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImlhdCI6MTY4ODQ1MTE3NywiZXhwIjoxNjg4NDY5MTc3fQ.3aiE8hFgnHcPozu0A-8Bt5f41OX5cahQc6vzJQveKXg';
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next.handle(request);
  }
}
