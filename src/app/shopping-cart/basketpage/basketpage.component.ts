import { Component, OnInit } from '@angular/core';
import { BasketService } from "../shared/basket.service";
import { Product } from "../../home-page/shared/product.model";
import {ProductsService} from "../../home-page/shared/products.service";
import {CategoriesService} from "../../product-categories/shared/categories.service";


interface Item {
  id: number;
  name: string;
  productId: number;
  orderId: number;
  quantity: number;
  price: number;
  category: string;

}

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css']
})
export class BasketpageComponent implements OnInit {

  public basketItems: Product[] = [];
  header = '';
  products: Array<Product> = [];
  public productQuantityMap: Map<string, number> = new Map<string, number>();
  public itemNames: Map<number,string> = new Map<number, string>();
  public itemPrices: Map<number,number> = new Map<number, number>();
  public itemCategories: Map<number,string> = new Map<number, string>();
  public categories: any[] = [];
  //Placeholder
  public itemNamesAny: any[] = [];
  //Placeholder
  public itemCategoriesAny: any[] = [];
  //Placeholder
  public itemPricesAny: any[] = [];

  orderItems: Array<Item> = [];
  rows: any = [5, 10, 15];
  row: any = 5;

  constructor(private basketService: BasketService,
              private productService: ProductsService,
              private categoryService: CategoriesService,
  ) { }

  ngOnInit(): void {
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
    this.categoryService.getCategories().subscribe((list) => {
      this.itemCategoriesAny = list.map((category: any) => {
        that.itemCategories.set(category.id, category.name);
      })
    });

    // console.log(this.itemNames);
    setTimeout(() => {
      this.basketService.getOrderItems().subscribe((list: any[]) => {
        this.orderItems = list.map( (item: any) => {
          // console.log(item)
          return {
            id: item.id,
            name: this.itemNames.get(item.productId) || '',
            productId: item.productId,
            orderId: item.orderId,
            quantity: item.quantity,
            price: this.itemPrices.get(item.productId) || 0,
            category: this.itemCategories.get(item.categoryId) || ''
          };
        });
        // console.log(this.orderItems)
      });

    }, 500)
    this.orderItems.forEach((item: any) => {
      this.productQuantityMap.set(item.name, item.quantity);
    })
    }

  deleteProduct(product: any, index: number, event: any) {
    console.log(product)
    console.log(index)
    this.basketService.deleteOrderItem(product.id)

    this.orderItems.splice(index, 1);
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
    this.updateProductQuantityMap()
    this.updateProductQuantity(Item);

  }

  decrement(Item: Item) {
    if (Item.quantity > 1) {
      Item.quantity -= 1;
    }
    this.basketService.updateOrderQuantity(Item.id, Item.quantity)
    this.updateProductQuantityMap()
    this.updateProductQuantity(Item);

  }

  getTotalPrice(): string {
    let totalPrice = 0;
    this.orderItems.forEach((item) => {
      totalPrice += item.price * item.quantity
    });
    return totalPrice.toFixed(2);
  }
  getItemPrice(item: any){
    return (item.price * item.quantity).toFixed(2);
  }

  updateProductQuantity(Item: any) {
    this.basketService.updateOrderQuantity(Item.id, Item.quantity)

  }
}
