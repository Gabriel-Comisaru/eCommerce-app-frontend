import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../home-page/shared/products.service';
import {MessageService} from "primeng/api";
import {Product} from "../home-page/shared/product.model";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import { BASE_URL_API } from '../settings';

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
  productsList: Product[] = [];
  selectedProduct?: Product;
  row: number = 5;
  rows: number[] = [5, 10, 15];
  totalRecords: number = 0;
  pageNumber: number = 0;
  searchTerm = ''
  searchTermUpdate = new Subject<string>();
  editModalFlag: boolean = false;
  loading:boolean=false;
  baseUrlApi = BASE_URL_API;

  constructor(private productsService: ProductsService,
              private messageService: MessageService) {
  }

  showDialogNewProduct() {
    this.visible = true;
    this.editModalFlag = false;
  }

  showDialogEditProduct(product: any) {
    this.editModalFlag = true;
    this.visible = true;
    this.selectedProduct = product;
  }

  showDialogDeleteProduct(product: Product) {
    this.header = 'Delete';
    this.deleteVisible = true;
    this.selectedProduct = product;
  }

  onClose() {
    this.visible = false;
  }

  getProducts() {
    this.loading=true;
    this.productsService.getProductsDisplay(0, 5)
      .subscribe((list: any) => {
        this.productsList = list.products;
        this.totalRecords = list.numberOfItems;
        this.productsList = this.productsList.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
        this.loading=false;
      });
  }

  ngOnInit(): void {
    this.getProducts()
    // this.productsService.getProductsDisplay(this.first, this.row)
    //   .subscribe((list: any) => {
    //     this.productsList = list.products;
    //     this.totalRecords = list.numberOfItems;
    //     this.productsList = this.productsList.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
    //   });
    this.searchTermUpdate
      .pipe(
        debounceTime(500),
        distinctUntilChanged())
      .subscribe(value => {
        if (value.length > 2) {
          this.loading=true;
          this.productsService.getSearchedProducts(value)
            .subscribe(
              (item: { products: Array<Product>, numberOfItems: number, pageNumber: number }) => {
              this.productsList = item.products;
              this.pageNumber = item.pageNumber;
              this.totalRecords = item.numberOfItems;
              this.row = 5;
              this.loading=false;
            })
        } else if (value.length < 3) {
          this.getProducts()
        }
      })
  }

  onCloseDelete() {
    this.deleteVisible = false;
  }

  savedProduct(event: Product) {
    this.productsList = [...this.productsList, event]
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product Saved'});
  }

  updatedProduct(event: Product) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product Updated'});
    this.productsList = this.productsList.map((item: Product) => {
      if (item.id === event.id) {
        return {...event}
      }
      return item;
    })
    this.selectedProduct = event;
  }

  deletedProduct(event: Event) {
    this.loading=true;
    this.deleteVisible = false;
    this.productsService.delete(+event)
      .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            icon: 'pi pi-trash',
            summary: 'Success',
            detail: 'Product deleted'
          });
          this.loading = true;
          this.getProducts()

      },
      (error:Error)=>{
        console.log(error)
        this.loading=false;
        this.messageService.add({
          severity: 'error',
          icon: 'pi pi-info',
          summary: 'Error',
          detail: 'Oops'
        });
      })
  }

  handleMissingImg(event: ErrorEvent) {
    (event!.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
  }

  onPage(event: { rows: number, first: number }) {
    this.loading=true;
    event.rows === 5 ? this.pageNumber = event.first / 5
      : event.rows === 10 ? this.pageNumber = event.first / 10
        : event.rows === 15 ? this.pageNumber = event.first / 15
          : 0;
    this.productsService.getProductsDisplay(this.pageNumber, event.rows)
      .subscribe(item => {
        this.productsList = item.products
        this.loading=false;
      });
  }
}
