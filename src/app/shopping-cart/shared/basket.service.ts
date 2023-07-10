import { Injectable } from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketItems: Product[] = [];

  constructor() {}

  addToBasket(product: Product): void {
    this.basketItems.push(product);
  }

  getBasketItems(): Product[] {
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
