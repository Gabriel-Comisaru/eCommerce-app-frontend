import {Component, Input} from '@angular/core';
import {MockProductModel} from "../shared/mock-product.model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() mockProduct!: MockProductModel[];

  constructor() {}

  filterList(category: string) {
    console.log('Selected Category:', category);
    category
      ? this.mockProduct.filter((product: MockProductModel) => product.category === category) && console.log(this.mockProduct)
      : this.mockProduct && console.log('aaa');
  }
}
