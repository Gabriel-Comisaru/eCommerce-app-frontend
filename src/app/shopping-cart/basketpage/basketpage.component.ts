import { Component, OnInit } from '@angular/core';
import { MockProductModel } from "../../product-all/shared/mock-product.model";
import { BasketService } from "../shared/basket.service";
import {MockProductDetailed} from "../../home-page/shared/mockProduct.model";

@Component({
  selector: 'app-basketpage',
  templateUrl: './basketpage.component.html',
  styleUrls: ['./basketpage.component.css']
})
export class BasketpageComponent implements OnInit {

  public basketItems: MockProductModel[] = [];
  visible = false;
  header = '';
  products: Array<MockProductDetailed> = [];
  selectedProduct: any = [];
  rows: any = [5, 10, 15];
  row: any = 5;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketItems = this.basketService.getBasketItems();
    console.log(this.basketItems);
  }

  showDialogEditProduct(product: any) {
    this.visible = true;
    this.header = 'Edit product'
    this.selectedProduct = product;
  }
  showDialogDeleteProduct(product: any, event: any) {
    this.visible = true;
    event.stopPropagation();
    this.header = 'Delete'
    this.selectedProduct = product;
  }


  selectRows(event: any) {
    this.row = +event.value;
  }

  checkout() {

  }
}
