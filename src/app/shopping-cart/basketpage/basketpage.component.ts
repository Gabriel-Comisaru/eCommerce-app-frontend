import { Component, OnInit } from '@angular/core';
import { MockProductModel } from "../../product-all/shared/mock-product.model";
import { BasketService } from "../shared/basket.service";
import { Product } from "../../home-page/shared/product.model";
import {ProductsService} from "../../home-page/shared/products.service";
import {MockProductsService} from "../../product-all/shared/mock-products.service";

interface Item {
  id: number;
  name: string;
  productId: number;
  orderId: number;
  quantity: number;

}

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css']
})
export class BasketpageComponent implements OnInit {

  public basketItems: MockProductModel[] = [];
  visible = false;
  header = '';
  products: Array<Product> = [];
  public productQuantityMap: Map<string, number> = new Map<string, number>();
  public itemNames: Map<number,string> = new Map<number, string>();
  public categoryNames: Map<number,string> = new Map<number, string>();
  public categories: any[] = [];
  public itemNamesAny: any[] = [];

  orderItems: Array<Item> = [];

  selectedProduct: any = [];
  rows: any = [5, 10, 15];
  row: any = 5;

  constructor(private basketService: BasketService,
              private productService: MockProductsService
  ) { }

  ngOnInit(): void {
    // this.categoryService.getCategories().subscribe((list) => {
    //   this.categories = list.map((category: any) => {
    //     that.categoryNames.set(category.id, category.name);
    //   })
    // })
    let that = this;
    this.productService.getProducts().subscribe((list) => {
      this.itemNamesAny = list.map((product: any) => {
        that.itemNames.set(product.id, product.name);
    });
    });
    console.log(this.itemNames);
    setTimeout(() => {
      this.basketService.getOrderItems().subscribe((list: any[]) => {
        this.orderItems = list.map( (item: any) => {
          return {
            id: item.id,
            name: this.itemNames.get(item.productId) || '',
            productId: item.productId,
            orderId: item.orderId,
            quantity: item.quantity,
          };
        });
        console.log(this.orderItems)
      });

    }, 500)

    }

  deleteProduct(product: any, index: number, event: any) {
    console.log(product)
    this.basketService.deleteOrderItem(product.id)
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
