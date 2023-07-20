import { Component, OnInit } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import { Product } from '../../home-page/shared/product.model';
import { ProductsService } from '../../home-page/shared/products.service';
import { CategoriesService } from '../../product-categories/shared/categories.service';
import { Item } from '../shared/item.model';
import { forkJoin } from 'rxjs';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';
import {Router} from "@angular/router";

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css'],
})
export class BasketpageComponent implements OnInit {
  constructor(
    private basketService: BasketService,
    private productService: ProductsService,
    private router: Router
  ) {}

  public basketItems: Product[] = [];

  public products: any = [];
  public orderItemProducts: any = [];
  public orderedItems: any = [];
  loading: boolean = true;

  //Map the current quantity of each product
  public productQuantityMap: Map<string, number> = new Map<string, number>();
  //map the properties of each product

  rows: any = [5, 10, 15];
  row: any = 5;

  ngOnInit(): void {
    this.loading = true;

    const productSubscriber = this.productService.getProducts();
    const orderSubscriber = this.basketService.getOrderItems();

    forkJoin([productSubscriber, orderSubscriber]).subscribe((res: any) => {
      [this.products, this.orderItemProducts] = res;
      this.products.forEach((product: any) => {
        let item = this.orderItemProducts.filter((orderItem: any) => {
          if (orderItem.productId === product.id) {
            this.orderedItems.push({
              id: orderItem.id,
              name: product.name,
              category: product.categoryName,
              price: product.price,
              image: product.imagesName[0],
              quantity: orderItem.quantity,
              stock: product.unitsInStock,
            });
          }
        });
      });
    });

    this.loading = false;
  }

  deleteProduct(product: any, event: any) {
    console.log(product);
    this.basketService.deleteOrderItem(product.id).subscribe((res) => {
      this.orderedItems = this.orderedItems.filter(
        (item: any) => item.id !== product.id
      );
      this.productService.shoppingCartObservable.next({
        orderItem: product,
        productAction: 'delete',
      });
    });
  }

  checkout() {
    // Implement the checkout functionality here
    this.router.navigate(['/order-data']);
  }

  updateProductQuantityMap(): void {
    this.productQuantityMap.clear();
    this.basketItems.forEach((item) => {
      const productName = item.name;
      if (!this.productQuantityMap.has(productName)) {
        const count = this.basketItems.filter(
          (prod) => prod.name === productName
        ).length;
        this.productQuantityMap.set(productName, count);
      }
    });
  }
  increment(Item: Item) {
    Item.quantity += 1;
    this.basketService.updateOrderQuantity(Item.id, Item.quantity);
    this.updateProductQuantityMap();
    this.updateProductQuantity(Item);
  }

  decrement(Item: Item) {
    if (Item.quantity > 1) {
      Item.quantity -= 1;
    } else if (Item.quantity === 1) {
      this.deleteProduct(Item, null);
    }
    this.basketService.updateOrderQuantity(Item.id, Item.quantity);
    this.updateProductQuantityMap();
    this.updateProductQuantity(Item);
  }

  getTotalPrice(): string {
    let totalPrice = 0;
    this.orderedItems.forEach((item: any) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  }

  getItemPrice(item: any) {
    return (item.price * item.quantity).toFixed(2);
  }

  updateProductQuantity(Item: any) {
    this.basketService.updateOrderQuantity(Item.id, Item.quantity).subscribe();
  }
}
