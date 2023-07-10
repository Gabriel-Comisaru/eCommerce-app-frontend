import { Component, OnInit } from '@angular/core';
import { BasketService } from "../shared/basket.service";
import { Product } from "../../home-page/shared/product.model";
import {ProductsService} from "../../home-page/shared/products.service";


interface Item {
  id: number;
  name: string;
  productId: number;
  orderId: number;
  quantity: number;
  price: number;

}

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css']
})
export class BasketpageComponent implements OnInit {

  public basketItems: Product[] = [];
  visible = false;
  header = '';
  products: Array<Product> = [];
  public productQuantityMap: Map<string, number> = new Map<string, number>();
  public itemNames: Map<number,string> = new Map<number, string>();
  public itemPrices: Map<number,number> = new Map<number, number>();
  public categoryNames: Map<number,string> = new Map<number, string>();
  public categories: any[] = [];
  //Placeholder
  public itemNamesAny: any[] = [];
  //Placeholder
  public itemPricesAny: any[] = [];

  orderItems: Array<Item> = [];

  selectedProduct: any = [];
  rows: any = [5, 10, 15];
  row: any = 5;

  constructor(private basketService: BasketService,
              private productService: ProductsService
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
    this.productService.getProducts().subscribe((list) => {
      this.itemPricesAny = list.map((product: any) => {
        that.itemPrices.set(product.id, product.price);
      })
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
            price: this.itemPrices.get(item.productId) || 0
          };
        });
        console.log(this.orderItems)
      });

    }, 500)

    }

  deleteProduct(product: any, index: number, event: any) {
    console.log(product)
    console.log(index)
    this.basketService.deleteOrderItem(product.id).subscribe()

    // this.orderItems.splice(index, 1);
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
  increment(Item: Item) {

    Item.quantity += 1;
    this.basketService.updateOrderQuantity(Item.id, Item.quantity)


  }


  decrement(Item: Item) {

    if (Item.quantity > 1) {
      Item.quantity -= 1;
    }

    this.basketService.updateOrderQuantity(Item.id, Item.quantity)

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

  updateProductQuantity(Item: any) {
    this.basketService.updateOrderQuantity(Item.id, Item.quantity)

  }
}
