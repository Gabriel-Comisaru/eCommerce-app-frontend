import {Component} from '@angular/core';
import {UpdateProductComponent} from "./update-product/update-product.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  visible = false;
  header = '';

  constructor() {
  }

  showDialogNewProduct() {
    this.visible = true;
    this.header='Add new product'
  }

  showDialogEditProduct() {
    this.visible = true;
    this.header='Edit product'
  }

  onClose(){
    this.visible=false;
  }

}
