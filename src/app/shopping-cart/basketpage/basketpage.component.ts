import { Component, OnInit } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import { Product } from '../../home-page/shared/product.model';
import { ProductsService } from '../../home-page/shared/products.service';
import { CategoriesService } from '../../product-categories/shared/categories.service';
import { Item } from '../shared/item.model';
import { forkJoin } from 'rxjs';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';
import {Router} from "@angular/router";
import {OrderedItem} from "../shared/orderedItem.model";

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

  public products: any = [];
  public orderItemProducts: any = [];
  public orderedItems: OrderedItem[] = [];
  loading: boolean = true;
  rows: number[] = [5, 10, 15];
  row: number = 5;
  public orderedItemsIds: number[] = [];

  ngOnInit(): void {
    this.loading = true;

    const productSubscriber = this.productService.getProducts();
    const orderSubscriber = this.basketService.getOrderItems();

    forkJoin([productSubscriber, orderSubscriber]).subscribe((res: any) => {
      [this.products, this.orderItemProducts] = res;
      console.log(res)
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
      this.orderedItemsIds = this.orderedItems.map((item: any) => item.id);
    });

    this.loading = false;
  }

  deleteProduct(product: any, event: any) {
    this.basketService.deleteOrderItem(product.id).subscribe((res) => {
      this.orderedItems = this.orderedItems.filter(
        (item: any) => item.id !== product.id
      );
      this.productService.shoppingCartObservable.next({
        ...product,
        action: 'delete',
      });
    });
  }

  checkout() {
    // Implement the checkout functionality here
    this.router.navigate(['/order-data'], { queryParams: { ids: this.orderedItemsIds } });
  }

  increment(Item: Item) {
    Item.quantity += 1;
    this.basketService.updateOrderQuantity(Item.id, Item.quantity);
    this.updateProductQuantity(Item);
  }

  decrement(Item: Item) {
    if (Item.quantity > 1) {
      Item.quantity -= 1;
    } else if (Item.quantity === 1) {
      this.deleteProduct(Item, null);
    }
    this.basketService.updateOrderQuantity(Item.id, Item.quantity);
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
