import {Component} from '@angular/core';
import {ProductsService} from "../../home-page/shared/products.service";

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.css']
})
export class AdminOrdersListComponent {

  orders: any[] = [];
  rows: any = [5, 10, 15]
  row: any=5;
  status: any = ['ACTIVE', 'CHECKOUT', 'PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  numberOfPages:any;
  totalRecords:any;
  pageNumber = 0;


  constructor(private service: ProductsService) {
  }

  ngOnInit() {
    this.service.getOrders(this.pageNumber,this.row)
      .subscribe(item => {
        this.orders = item.orders;
        this.numberOfPages = item.numberOfPages;
        this.totalRecords=item.numberOfItems;
        this.orders.forEach(item => {
          return {status: item.status}
        })
      })
  }

  changeStatus(id: number, event: any) {
    this.service.updateStatus(id, event)
      .subscribe()
  }

  deleteOrder(order: any) {
    this.service.deleteOrder(order.id)
      .subscribe(() =>
        this.orders = this.orders
          .filter((item: any) => item.id != order.id))
  }
  
  onPage(event: any) {
    if(event.rows===5) {
      this.pageNumber = event.first / 5
    }else if(event.rows===10){
      this.pageNumber = event.first / 10
    }else if(event.rows===15){
      this.pageNumber = event.first / 15
    }
    console.log(event)
    this.service.getOrders(this.pageNumber,event.rows)
      .subscribe(item=> {
        this.orders = item.orders
        this.orders.forEach(item => {
          return {status: item.status}
        })
      });
  }
}
