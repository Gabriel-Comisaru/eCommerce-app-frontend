import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MockProductDetailed } from './mockProduct.model';
@Injectable({
  providedIn: 'root',
})

export class MockProductsService {
  constructor(private httpClient: HttpClient) {}

  private mockProductsUrl = 'https://dummyjson.com/products';

  getMockProducts(): Observable<any> {
    return this.httpClient.get<any>(this.mockProductsUrl);
  }

  getProduct(id: number): Observable<any | undefined> {
    const url = `${this.mockProductsUrl}/${id}`;
    return this.httpClient.get(url);
  }
}
