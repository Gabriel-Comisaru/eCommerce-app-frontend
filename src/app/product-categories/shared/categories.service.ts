import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  private mockProductsUrl = 'https://dummyjson.com/products';
  private url = 'http://localhost:8080/api/categories'

  getMockProducts(): Observable<any> {
    return this.httpClient.get<any>(this.mockProductsUrl);
  }


  getCategories(): Observable<any> {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW5hbmQyNyIsImlhdCI6MTY4ODQ3MTM1MywiZXhwIjoxNjg4NDg5MzUzfQ.hilzy3f8A786zVLwNFFrh_m_y6E50Ald7u-kYB12q8I';
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.url).pipe(
      tap((data: any) => {
        // console.log('Categories received from the backend:', data);
      }),
      catchError((error: any) => {
        console.error('An error occurred:', error);
        // Handle the error as needed
        return throwError('Something went wrong');
      }),
    );
  }
  getCategoryById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${id}`).pipe(
      tap((data: any) => {
        // console.log('Category received from the backend:', data);
      }),
      catchError((error: any) => {
        console.error('An error occurred:', error);
        // Handle the error as needed
        return throwError('Something went wrong');
      }),
    );
  }
}
