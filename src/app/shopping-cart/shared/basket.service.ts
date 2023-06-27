import { Injectable } from '@angular/core';
import {MockProductModel} from "../../product-all/shared/mock-product.model";

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketItems: MockProductModel[] = [];

  constructor() {}

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
}
