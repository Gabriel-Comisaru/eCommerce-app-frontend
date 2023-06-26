import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
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

  // i want to add it in cartList or favoriteList
  addMockProduct(
    product: MockProductDetailed,
    url: string
  ): Observable<MockProductDetailed> {
    return this.httpClient.post<MockProductDetailed>(url, product);
  }

  // searchMockItem(value: string): Observable<MockProductDetailed[]> {
  //   if (!value.trim()) {
  //     return of([]);
  //   }
  //   return this.httpClient
  //     .get<MockProductDetailed>(`${this.mockProductsUrl}/?search=${value}`)
  //     .pipe(
  //       tap(
  //       )
  //     );
  // }
}
