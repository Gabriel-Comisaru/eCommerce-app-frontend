import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-status',
  templateUrl: './product-status.component.html',
  styleUrls: ['./product-status.component.css'],
})
export class ProductStatusComponent {
  @Input() product: any;

  get stock() {
    return this.product.unitsInStock > 50
      ? 'In stock'
      : this.product.unitsInStock <= 50 && this.product.unitsInStock > 10
      ? 'Limited stock'
      : this.product.unitsInStock <= 10 && this.product.unitsInStock > 1
      ? 'Last ' + this.product.unitsInStock + ' pieces'
      : this.product.unitsInStock === 1
      ? 'Last piece available'
      : 'Out of stock';
  }
}
