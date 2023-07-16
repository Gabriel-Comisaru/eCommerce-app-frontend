import {Injectable, Optional} from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NavBarComponent} from "../../nav-bar/nav-bar.component";

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  constructor(private httpClient: HttpClient,
              @Optional() public NavBarComponent: NavBarComponent,
              ) {}
  private basketItems: Product[] = [];
  orderItems: any   = [];
  private url = 'http://localhost:8081/api';


  createOrder(productId: number) {
    const url = `${this.url}/orderItems/${productId}?quantity=1`;
    return this.httpClient.post(url, {}).subscribe(() => {
      this.NavBarComponent.loadBasketContent();
    });
  }

  deleteOrderItem(productId: number) {
    const url = `${this.url}/orderItems/${productId}`;
    // return this.httpClient.delete(url).subscribe(() => {
    //   this.NavBarComponent.loadBasketContent();
    // });
    this.httpClient.delete(url).subscribe(() => {})
    this.NavBarComponent.loadBasketContent();
    return
  }

  getOrderItems(): Observable<any> {
    const url = `${this.url}/orderItems`;
    this.orderItems = this.httpClient.get<any>(url);
    return this.httpClient.get<any>(url)
  }


  updateOrderQuantity(productId: number, quantity: number) {
    const url = `${this.url}/orderItems/${productId}/quantity?quantity=${quantity}`;
    // console.log(url)
    return this.httpClient.put(url, {}).subscribe();
  }



}
