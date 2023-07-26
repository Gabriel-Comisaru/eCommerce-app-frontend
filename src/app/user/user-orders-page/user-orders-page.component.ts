import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailedOrder } from 'src/app/home-page/shared/order.model';
import { ProductsService } from 'src/app/home-page/shared/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders-page',
  templateUrl: './user-orders-page.component.html',
  styleUrls: ['./user-orders-page.component.css'],
})
export class UserOrdersPageComponent {
  constructor(
    private userService: UserService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public userOrders: DetailedOrder[] = [];
  ngOnInit() {
    this.userService
      .getDetailedUserOrders()
      .subscribe((res) => (this.userOrders = res));
  }

  goToCheckoutPage(orderId: number) {
    return this.router.navigate(['order-data'], {
      queryParams: { ids: orderId },
    });
  }
}
