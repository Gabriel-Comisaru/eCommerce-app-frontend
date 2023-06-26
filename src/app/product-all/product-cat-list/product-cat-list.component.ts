import {Component, Input} from '@angular/core';
import {MockProductModel} from "../shared/mock-product.model";

@Component({
  selector: 'app-product-cat-list',
  templateUrl: './product-cat-list.component.html',
  styleUrls: ['./product-cat-list.component.css']
})
export class ProductCatListComponent {
  constructor() {}
  @Input() categories!: any;
}
