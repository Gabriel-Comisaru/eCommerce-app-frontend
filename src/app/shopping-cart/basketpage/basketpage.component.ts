import { Component, OnInit } from '@angular/core';
import { BasketService } from "../shared/basket.service";
import { Product } from "../../home-page/shared/product.model";
import {ProductsService} from "../../home-page/shared/products.service";
import {CategoriesService} from "../../product-categories/shared/categories.service";
import { Item } from "../shared/item.model";

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css']
})
export class BasketpageComponent implements OnInit {
  constructor(private basketService: BasketService,
              private productService: ProductsService,
  ) { }

  public basketItems: Product[] = [];
  loading: boolean = true;

  //Map the current quantity of each product
  public productQuantityMap: Map<string, number> = new Map<string, number>();
  //map the properties of each product
  public itemNames: Map<number,string> = new Map<number, string>();
  public itemPrices: Map<number,number> = new Map<number, number>();
  public itemCategories: Map<number,string> = new Map<number, string>();
  public itemStock: Map<number,number> = new Map<number, number>();

  //Placeholder
  public itemNamesAny: any[] = [];


  orderItems: Array<Item> = [];
  rows: any = [5, 10, 15];
  row: any = 5;


  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe((list) => {
      this.itemNamesAny = list.map((product: any) => {
        this.itemNames.set(product.id, product.name);
        this.itemPrices.set(product.id, product.price);
        this.itemCategories.set(product.id, product.categoryName);
        this.itemStock.set(product.id, product.unitsInStock);

      });
    });

    setTimeout(() => {
      this.basketService.getOrderItems().subscribe((list: any[]) => {
        this.orderItems = list.map( (item: any) => {
          return {
            id: item.id,
            name: this.itemNames.get(item.productId) || '',
            productId: item.productId,
            orderId: item.orderId,
            quantity: item.quantity,
            price: this.itemPrices.get(item.productId) || 0,
            category: this.itemCategories.get(item.categoryId) || '',
            availableStock: this.itemStock.get(item.productId) || 0,
          };
        });
      });
    }, 500)
    this.orderItems.forEach((item: any) => {
      this.productQuantityMap.set(item.name, item.quantity);
    })
    this.loading = false;
    }

  deleteProduct(product: any, index: number, event: any) {
    this.basketService.deleteOrderItem(product.id).subscribe( (res) => {
      this.orderItems.splice(index, 1);
      }
    )
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
    } else if (Item.quantity === 1) {
      this.deleteProduct(Item, 0, null);
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
    this.basketService.updateOrderQuantity(Item.id, Item.quantity).subscribe()
  }
}
