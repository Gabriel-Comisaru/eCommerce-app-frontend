import {Component, Input, OnInit} from '@angular/core';
import {MockProductsService} from "../home-page/shared/mock-products.service";
import {MockProductDetailed} from "../home-page/shared/mockProduct.model";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{

  visible = false;
  header = '';
  products:Array<MockProductDetailed>=[];
  mockProductsList=[];
  selectedProduct:any=[];

  constructor(private mockProductsService:MockProductsService) {
  }

  showDialogNewProduct() {
    this.visible = true;
    this.header='Add new product'
  }

  showDialogEditProduct(product:any) {
    this.visible = true;
    this.header='Edit product'
    this.selectedProduct=product;
  }

  onClose(){
    this.visible=false;
  }

  ngOnInit(): void {
    this.mockProductsService.getMockProducts().subscribe((list) => {
      this.mockProductsList = list.products.map((product: any) => {
        return {
          id: product.id,
          name: product.title,
          photos: product.images,
          price: product.price,
          rating: product.rating,
          reviews: ['No reviews available'],
          discount: product.discount,
          category: product.category,
          description: product.description,
          stock: product.stock,
        };
      });
    });
  }

  deleteItem(product:any,event:any) {
    event.stopPropagation();
  console.log(product.id)
  }
}
