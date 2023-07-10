import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { MockProductModel} from "./mock-product.model";

@Injectable({
  providedIn: 'root',
})
export class MockProductsService {


  constructor(private httpClient: HttpClient) {
  }

  private urlProducts = 'http://localhost:8080/api/products';
  private urlCategories = 'http://localhost:8080/api/categories'

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.urlProducts);
  }

  private mockProductsUrl = 'https://dummyjson.com/products';
  private url = 'http://localhost:8080/api/products'

  getCategories() {
    return this.httpClient.get<any>(this.urlCategories);
  }

  getCategoryById(categoryId: any) {
    const url = `${this.urlCategories}/${categoryId}`;
    return this.httpClient.get<any>(url);
  }

  randomMethod(): Observable<any> {
    return this.httpClient.get<any>(this.url);
  }
  saveProducts(product: any, categoryId: any): Observable<any> {
    const url = `${this.urlProducts}/category/${categoryId}`
    return this.httpClient.post<any>(url, product);

  }

  updateProduct(product: any, id: number, token: any): Observable<any> {
    const url = `${this.urlProducts}/${id}`;
    return this.httpClient.put<any>(url, product);
  }

  delete(id: number):Observable<any> {
    const url = `${this.urlProducts}/${id}`;
    return this.httpClient.delete(url);
  }
}
