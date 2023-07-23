import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailedOrder, Order } from 'src/app/home-page/shared/order.model';
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
  public activeIndex: number | undefined;
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
  goToOrderDetails(orderId: number) {
    return this.router.navigate([`order-details/${orderId}`]);
  }

  public accordionOpen: boolean = false;
  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }
  setActiveIndex(index: number) {
    this.activeIndex = index;
  }
  goToProductPage(productId: number) {
    this.router.navigate([`product-details/${productId}`]);
  }
}
