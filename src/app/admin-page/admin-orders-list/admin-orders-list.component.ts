import {Component} from '@angular/core';
import {ProductsService} from "../../home-page/shared/products.service";

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.css']
})
export class AdminOrdersListComponent {

  orders: any[] = [];
  rows: any = [5, 20, 25]
  row: any = 5;
  numberOfPages: any;
  status: any = ['ACTIVE', 'CHECKOUT', 'PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  currentStatus: any;

  constructor(private service: ProductsService) {
  }

  ngOnInit() {
    this.service.getOrders()
      .subscribe(item => {
        this.orders = item.orders;
        this.row = item.numberOfItems;
        this.numberOfPages = item.numberOfPages;
        this.orders.forEach(item => {
          return {status: item.status}
        })
      })
  }

  changeStatus(id: number,event:any) {
    this.service.updateStatus(id, event)
      .subscribe()
  }

  deleteOrder(order: any) {
  this.service.deleteOrder(order.id)
    .subscribe(()=>
      this.orders = this.orders
      .filter((item: any) => item.id != order.id))
  }
}
