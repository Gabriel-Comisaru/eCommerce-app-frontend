import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OrderItem } from 'src/app/home-page/shared/orderItem.model';
import { ProductsService } from 'src/app/home-page/shared/products.service';
import { BASE_URL_API } from 'src/app/settings';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css'],
})
export class UserOrderDetailsComponent {
  @Input() orderItems!: OrderItem[];
  @Input() orderStatus!: string;
  public baseUrlApi = BASE_URL_API;
  public hoverProduct!: OrderItem;
  public productAddedToCart: boolean = false;
  public basketItems: OrderItem[] = [];
  constructor(
    private router: Router,
    private productService: ProductsService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.productService.getShopingCartObservable().subscribe((res) => {
      this.basketItems = res.basketOrderItems!;
    });
  }

  goToProductPage(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }

  orderAgain(product: OrderItem) {
    if (this.productAddedToCart) {
      return;
    }
    let orderItem = this.basketItems.filter(
      (item: OrderItem) => item.productId === product.productId
    );
    console.log(orderItem);
    if (orderItem.length) {
      if (product.unitsInStock >= orderItem[0].quantity + 1) {
        return this.productService
          .updateOrderQuantity(orderItem[0].id, orderItem[0].quantity + 1)
          .subscribe(() => (this.productAddedToCart = false));
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Quantity exceeds stock',
        });
      }
    } else {
      return this.productService
        .addProductToOrder(product.productId, 1)
        .subscribe(() => (this.productAddedToCart = false));
    }
    return;
  }

  getProductImage(productImage: string) {
    return `${BASE_URL_API}/images/download?name=${productImage}`;
  }
}
