import { Component, OnInit } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import { ProductsService } from '../../home-page/shared/products.service';
import { Item } from '../shared/item.model';
import {Router} from "@angular/router";
import {BasketModel} from "../shared/basket-model";
import { BASE_URL_API } from 'src/app/settings';

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
  public orderedItems: BasketModel[] = [];
  loading: boolean = true;
  rows: number[] = [5, 10, 15];
  row: number = 5;
  public orderedItemsIds: number[] = [];

  ngOnInit(): void {
    this.loading = true;

    this.basketService.getOrderedItems().subscribe((res) => {
      console.log(res, 'asdasdasdasasdasdasd')
      this.orderedItems = res.map((item: any) => {
        return {
          ...item,
          productImage: `${BASE_URL_API}/images/download?name=${item.imageName}`,
        };
      });
      this.loading = false;
    })

    this.loading = false;
  }

  loadData() {
    this.loading = true;
    this.basketService.getMyOrders().subscribe((res) => {
      this.orderedItems = res.map((item: any) => {
        return {
          ...item,
          productImage: `${BASE_URL_API}/images/download?name=${item.imageName}`,
        };
        console.log(this.orderedItems, 'asdasda')
      })
      this.loading = false;
    });

  }

  deleteProduct(product: any, event: any) {
    this.productService.deleteOrderItem(product.id).subscribe((res) => {
      this.orderedItems = this.orderedItems.filter(
        (item: any) => item.id !== product.id
      );
    });
  }

  checkout() {
    // Implement the checkout functionality here
    this.orderedItemsIds = this.orderedItems.map((item: any) => item.id);
    this.router.navigate(['/order-data'], { queryParams: { ids: this.orderedItems[0].orderId } });
  }

  increment(Item: Item) {
    Item.quantity += 1;
    this.productService.updateOrderQuantity(Item.id, Item.quantity);
    this.updateProductQuantity(Item);
  }

  decrement(Item: Item) {
    if (Item.quantity > 1) {
      Item.quantity -= 1;
    } else if (Item.quantity === 1) {
      this.deleteProduct(Item, null);
    }
    this.productService.updateOrderQuantity(Item.id, Item.quantity);
    this.updateProductQuantity(Item);
  }

  getTotalPrice(): string {
    let totalPrice = 0;
    this.orderedItems.forEach((item: any) => {
      totalPrice += item.productPrice * item.quantity;
    });
    return totalPrice.toFixed(2);
  }

  getItemPrice(item: any) {
    return (item.productPrice * item.quantity).toFixed(2);
  }

  updateProductQuantity(Item: any) {
    this.productService.updateOrderQuantity(Item.id, Item.quantity).subscribe();
  }
}
