import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockProductModel} from "./mock-product.model";

@Injectable({
  providedIn: 'root',
})
export class MockProductsService {
  constructor(private httpClient: HttpClient) {}

  private mockProductsUrl = 'https://dummyjson.com/products';

  getMockProducts(): Observable<any> {
    return this.httpClient.get<any>(this.mockProductsUrl);
  }
}
