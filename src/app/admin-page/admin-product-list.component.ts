import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../home-page/shared/products.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css'],
})
export class AdminProductListComponent implements OnInit {
  visible = false;
  deleteVisible = false;
  header = '';
  productsList: any = [];
  selectedProduct: any = [];
  rows: any = [5, 10, 15];
  row: any = 5;

  constructor(private productsService: ProductsService) {
  }

  showDialogNewProduct() {
    this.visible = true;
    this.header = 'Add new product';
  }

  showDialogEditProduct(product: any) {
    this.visible = true;
    this.header = 'Edit product';
    this.selectedProduct = product;
  }

  showDialogDeleteProduct(product: any, event: any) {
    this.header = 'Delete';
    this.deleteVisible = true;
    event.stopPropagation();
    this.selectedProduct = product;
  }

  onClose() {
    this.visible = false;
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((list: any) => {
      this.productsList = list;
      this.productsList = this.productsList.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
    });
  }

  onCloseDelete() {
    this.deleteVisible = false;
  }

  savedProduct(event: any) {
    this.productsList = [...this.productsList, event]
  }

  updatedProduct(event: any) {
    this.productsList = this.productsList.map((item: any) => {
      if (item.id === event.id) {
        return {...event}
      }
      return item;
    })
  }

  deletedProduct(event: Event) {
    this.productsService.delete(+event)
      .subscribe(() => this.productsList = this.productsList
        .filter((item: any) => item.id != +event))
  }

  handleMissingImg(event: ErrorEvent) {
    (event!.target as HTMLImageElement).src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
  }
}
