import { Component, OnInit } from '@angular/core';
import { MockProductModel } from "../../product-all/shared/mock-product.model";
import { BasketService } from "../shared/basket.service";

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css']
})
export class BasketpageComponent implements OnInit {

  public basketItems: MockProductModel[] = [];

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketItems = this.basketService.getBasketItems();
    console.log(this.basketItems);
  }


}
