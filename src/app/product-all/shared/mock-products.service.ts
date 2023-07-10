import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import { MockProductModel} from "./mock-product.model";

@Injectable({
  providedIn: 'root',
})
export class MockProductsService {
  constructor(private httpClient: HttpClient) {}

  private mockProductsUrl = 'https://dummyjson.com/products';
  private url = 'http://localhost:8080/api/products'


  getMockProducts(): Observable<any> {
    return this.httpClient.get<any>(this.mockProductsUrl);
  }


  getProducts(): Observable<any> {
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW5hbmQyNyIsImlhdCI6MTY4ODQ3MTM1MywiZXhwIjoxNjg4NDg5MzUzfQ.hilzy3f8A786zVLwNFFrh_m_y6E50Ald7u-kYB12q8I';
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.url).pipe();
  }
  getSingleProduct(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/${id}`);
  }
}
