import { Injectable } from '@angular/core';
import {MockProductModel} from "../../product-all/shared/mock-product.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  constructor(private httpClient: HttpClient) {}
  private basketItems: MockProductModel[] = [];
  private url = 'http://localhost:8080';


  // createOrder(productId: number) {
  //   const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg1NTQxODYsImV4cCI6MTY4ODU3MjE4Nn0.w2bw3CseLh-pfv-XmGiVdY7JwljAOWGrgBubUVbIiFk';
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const url = `${this.url}/${productId}`;
  //   console.log(url);
  //   // return this.httpClient.post();
  //   return this.httpClient.post(url, {"quantity": 1}, {headers}).subscribe();
  // }
  createOrder(productId: number) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2QiLCJpYXQiOjE2ODg1NTQxODYsImV4cCI6MTY4ODU3MjE4Nn0.w2bw3CseLh-pfv-XmGiVdY7JwljAOWGrgBubUVbIiFk';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.url}/api/orderItems/${productId}`; // Assuming the API endpoint is '/api/orderItems/{productId}'
    console.log(url);
    return this.httpClient.post(url, { "quantity": 1 }, { headers }).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
      }
    );
  }



  addToBasket(product: MockProductModel): void {
    this.basketItems.push(product);
  }

  getBasketItems(): MockProductModel[] {
    return this.basketItems;
  }

  getBasketItemCount(): number {
    return this.basketItems.length;
  }
  log() {
    console.log(this.basketItems);
  }
  deleteFromBasket(index: number): void {
    if (index >= 0 && index < this.basketItems.length) {
      this.basketItems.splice(index, 1);
    }
  }
}
