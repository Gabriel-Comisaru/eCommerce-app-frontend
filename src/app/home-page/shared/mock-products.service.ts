import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  saveMockProducts(product:any):Observable<any>{
    return this.httpClient.post<any>(this.mockProductsUrl+'/add',product);
  }

  updateProduct(product:any,id:number):Observable<any>{
    return this.httpClient.put<any>(this.mockProductsUrl+`/${id}`,product);
  }

}
