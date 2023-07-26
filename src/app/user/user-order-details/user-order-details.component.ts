import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/home-page/shared/orderItem.model';
import { ProductsService } from 'src/app/home-page/shared/products.service';
import { UserService } from 'src/app/services/user.service';
import { BASE_URL_API } from 'src/app/settings';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css'],
})
export class UserOrderDetailsComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private productsService: ProductsService
  ) {}

  @Input() orderItems!: OrderItem[];
  @Input() orderStatus!: string;
  baseUrlApi = BASE_URL_API;
  public hoverProduct!: OrderItem;

  goToProductPage(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }

  buyAgain(product: OrderItem) {
    this.productsService
      .addProductToOrder(product.productId, 1)
      .subscribe((res) => {
        this.productsService.shoppingCartObservable.next({
          orderItem: res,
          productAction: 'add',
        });
      });
  }
}
