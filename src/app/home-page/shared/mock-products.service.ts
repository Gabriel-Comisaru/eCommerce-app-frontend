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
  getProduct(id: number): Observable<any | undefined> {
    const url = `${this.mockProductsUrl}/${id}`;
    return this.httpClient.get(url);
  }

  saveMockProducts(product: any): Observable<any> {
    return this.httpClient.post<any>(this.mockProductsUrl + '/add', product);
  }

  updateProduct(product: any, id: number): Observable<any> {
    const url = `${this.mockProductsUrl}/${id}`;
    return this.httpClient.put<any>(url, product);
  }

  delete(id: number) {
    const url = `${this.mockProductsUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  categoriesUrl = 'http://localhost:8080/api/categories';

  getToken(username: string, password: string): Observable<any> {
    const loginUrl = `http://localhost:8080/auth/login?username=${username}&password=${password}`;
    return this.httpClient.post<any>(loginUrl, '');
  }

  getTokenFromLocalStorage(): any {
    return localStorage.getItem('token');
  }
}
