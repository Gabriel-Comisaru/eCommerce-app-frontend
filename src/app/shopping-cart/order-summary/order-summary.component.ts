import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BasketService} from "../shared/basket.service";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  order: any = [];
  orderId: number = this.route.snapshot.queryParams['orderid'];

  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams['orderid'])
    this.basketService.getOrderForMe().subscribe((res: any) => {
      this.order = res
      console.log(res)
    })
  }

}
