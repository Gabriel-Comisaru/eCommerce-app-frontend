import {Component} from '@angular/core';
import {ProductsService} from "../../home-page/shared/products.service";
import {Order} from "../../home-page/shared/order.model";

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.css']
})
export class AdminOrdersListComponent {

  orders: Order[] = [];
  rows: number[] = [5, 10, 15]
  row: number = 5;
  status: string[] = ['ACTIVE', 'CHECKOUT', 'PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  numberOfPages: number = 0;
  totalRecords: number = 0;
  pageNumber: number = 0;
  loading: boolean = false;

  constructor(private service: ProductsService) {
  }

  ngOnInit() {
    this.getOrders()
  }

  getOrders() {
    this.loading = true;

    this.service.getOrders(this.pageNumber, this.row)
      .subscribe(item => {
        console.log(item.orders)
        this.orders = item.orders;
        this.numberOfPages = item.numberOfPages;
        this.totalRecords = item.numberOfItems;
        this.orders.forEach(item => {
          return {status: item.status}
        })
        this.loading = false;
      })
  }

  changeStatus(id: number, status: string) {
    this.service.updateStatus(id, status)
      .subscribe()
  }

  onPage(event: { rows: number, first: number }) {
    event.rows === 5 ? this.pageNumber = event.first / 5
      : event.rows === 10 ? this.pageNumber = event.first / 10
        : event.rows === 15 ? this.pageNumber = event.first / 15
          : 0;
    this.getOrders()
  }
}
