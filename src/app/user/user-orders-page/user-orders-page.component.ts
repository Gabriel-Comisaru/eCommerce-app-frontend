import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetailedOrder } from 'src/app/home-page/shared/order.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders-page',
  templateUrl: './user-orders-page.component.html',
  styleUrls: ['./user-orders-page.component.css'],
})
export class UserOrdersPageComponent {
  public userOrders: DetailedOrder[] = [];

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.userService
      .getDetailedUserOrders()
      .subscribe(
        (res) =>
          (this.userOrders = res.filter((order) => order.status !== 'ACTIVE'))
      );
  }

  goToCheckoutPage(orderId: number) {
    return this.router.navigate(['order-data'], {
      queryParams: { ids: orderId },
    });
  }
}
