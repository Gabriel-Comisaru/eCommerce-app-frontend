import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { BASE_URL_API } from 'src/app/settings';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {
  }

  private url = `${BASE_URL_API}/categories`

  getCategories(): Observable<any> {
    return this.httpClient.get<any>(this.url).pipe(
      tap((data: any) => {
      }),
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong');
      }),
    );
  }
}
