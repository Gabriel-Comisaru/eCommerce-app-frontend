import {Component, OnInit} from '@angular/core';
import {MockProductsService} from "../home-page/shared/mock-products.service";
import {MockProductDetailed} from "../home-page/shared/mockProduct.model";
import {deleteFunction} from "./utilities/utilities";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  visible = false;
  deleteVisible=false;
  header = '';
  products: Array<MockProductDetailed> = [];
  mockProductsList:any = [];
  selectedProduct: any = [];
  rows: any = [5, 10, 15];
  row: any = 5;
  token='';

  constructor(private mockProductsService: MockProductsService) {
  }

  showDialogNewProduct() {
    this.visible = true;
    this.header = 'Add new product'
  }

  showDialogEditProduct(product: any,event:any) {
    this.visible = true;
    this.header = 'Edit product'
    this.selectedProduct = product;
  }

  showDialogDeleteProduct(product: any, event: any) {
    this.header = 'Delete'
    this.deleteVisible = true;
    event.stopPropagation();
    this.selectedProduct = product;
  }

  onClose() {
    this.visible = false;
  }

  ngOnInit(): void {
    this.mockProductsService.getProducts()
      .subscribe(list => {
      this.mockProductsList = list
    });
    this.mockProductsService.getToken('admin','admin')
      .subscribe(res=>this.token=res.token)
  }

  // delete() {
  //   deleteFunction(this.mockProductsService, this.selectedProduct.id, this.products)
  //     .subscribe((items: Array<any>) => {
  //       this.products = items;
  //     });
  // }

  selectRows(event: any) {
    this.row = +event.value;
  }

  onCloseDelete() {
    this.deleteVisible=false;
  }

  savedProduct($event:any) {
  this.ngOnInit()
  }
}
