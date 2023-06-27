import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of, tap } from 'rxjs';
import { MockProductDetailed } from './mockProduct.model';
@Injectable({
  providedIn: 'root',
})
export class MockProductsService {
  constructor(private httpClient: HttpClient) {}

  private mockProductsUrl = 'https://dummyjson.com/products';

  public shoppingCartObservable = new Subject<MockProductDetailed[]>();
  public favoriteProductsObservable = new Subject<MockProductDetailed[]>();

  setInitialCartProducts() {
    const localStorageCartList = JSON.parse(
      localStorage.getItem('shoppingCart') || '[]'
    );
    this.shoppingCartObservable.next(localStorageCartList);
  }
  getShopingCartObservable(): Observable<MockProductDetailed[]> {
    return this.shoppingCartObservable.asObservable();
  }

  setInitialFavoriteProducts() {
    const localStorageCartList = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );
    this.favoriteProductsObservable.next(localStorageCartList);
  }
  getfavoriteProductsObservable(): Observable<MockProductDetailed[]> {
    return this.favoriteProductsObservable.asObservable();
  }

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
