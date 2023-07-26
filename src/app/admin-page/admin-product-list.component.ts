import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../home-page/shared/products.service';
import {MessageService} from "primeng/api";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css'],
  providers: [MessageService]
})
export class AdminProductListComponent implements OnInit {
  visible = false;
  deleteVisible = false;
  header = '';
  productsList: any = [];
  selectedProduct?: any = [];
  row: any = 5;
  rows: any = [5, 10, 15];
  totalRecords: any;
  first: any = 0;
  searchTerm = ''
  searchTermUpdate = new Subject<string>();

  constructor(private productsService: ProductsService,
              private messageService: MessageService) {
  }

  showDialogNewProduct() {
    this.visible = true;
    this.header = '';
  }

  showDialogEditProduct(product: any) {
    this.visible = true;
    this.selectedProduct = product;
    this.header = this.selectedProduct.name;
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
    this.productsService.getProductsDisplay(this.first, this.row)
      .subscribe((list: any) => {
        this.productsList = list.products;
        this.totalRecords = list.numberOfItems;
        this.productsList = this.productsList.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
      });
    this.searchTermUpdate
      .pipe(
        debounceTime(500),
        distinctUntilChanged())
      .subscribe(value => {
        if(value.length>2){
          this.searchTerm = value
        }
      })
  }

  onCloseDelete() {
    this.deleteVisible = false;
  }

  savedProduct(event: any) {
    this.productsList = [...this.productsList, event]
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product Saved'});
  }

  updatedProduct(event: any) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product Updated'});
    this.productsList = this.productsList.map((item: any) => {
      if (item.id === event.id) {
        return {...event}
      }
      return item;
    })
    this.selectedProduct = event;
  }

  deletedProduct(event: Event) {
    this.deleteVisible = false;
    this.productsService.delete(+event)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          icon: 'pi pi-trash',
          summary: 'Success',
          detail: 'Product deleted'
        });
        this.productsList = this.productsList
          .filter((item: any) => item.id != +event)
      })
  }

  handleMissingImg(event: ErrorEvent) {
    (event!.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
  }

  onPage(event: any) {
    if (event.rows === 5) {
      this.first = event.first / 5
    } else if (event.rows === 10) {
      this.first = event.first / 10
    } else if (event.rows === 15) {
      this.first = event.first / 15
    }
    console.log(event)
    this.productsService.getProductsDisplay(this.first, event.rows)
      .subscribe(item => {
        this.productsList = item.products
        console.log(item.products)
      });
  }
}
