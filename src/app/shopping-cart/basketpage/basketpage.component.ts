import { Component, OnInit } from '@angular/core';
import { MockProductModel } from "../../product-all/shared/mock-product.model";
import { BasketService } from "../shared/basket.service";
import { MockProductDetailed } from "../../home-page/shared/mockProduct.model";

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css']
})
export class BasketpageComponent implements OnInit {

  public basketItems: MockProductModel[] = [];
  visible = false;
  header = '';
  products: Array<MockProductDetailed> = [];
  public productQuantityMap: Map<string, number> = new Map<string, number>();

  selectedProduct: any = [];
  rows: any = [5, 10, 15];
  row: any = 5;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketItems = this.basketService.getBasketItems();
    console.log(this.basketItems);
    this.updateProductQuantityMap();
  }

  deleteProduct(product: any, index: number, event: any) {
    event.stopPropagation();
    this.header = 'Delete';
    this.selectedProduct = product;

    if (index !== -1) {
      this.basketService.deleteFromBasket(index);
      this.updateProductQuantityMap();
    }
  }

  selectRows(event: any) {
    this.row = +event.value;
  }

  checkout() {
    // Implement the checkout functionality here
  }

  updateProductQuantityMap(): void {
    this.productQuantityMap.clear();
    this.basketItems.forEach((item) => {
      const productName = item.name;
      if (!this.productQuantityMap.has(productName)) {
        const count = this.basketItems.filter((prod) => prod.name === productName).length;
        this.productQuantityMap.set(productName, count);
      }
    });
  }

  getFirstIndex(product: any): number {
    return this.basketItems.findIndex((item) => item.name === product.name);
  }

  getQuantity(product: any): number {
    return this.productQuantityMap.get(product.name) || 0;
  }

  isProductAvailable(product: any): boolean {
    const firstIndex = this.getFirstIndex(product);
    return firstIndex !== -1 && firstIndex === this.basketItems.indexOf(product);
  }
  getTotalPrice(): number {
    let totalPrice = 0;
    this.basketItems.forEach((item) => {
      totalPrice += item.price * this.getQuantity(item);
    });
    return totalPrice;
  }
}
