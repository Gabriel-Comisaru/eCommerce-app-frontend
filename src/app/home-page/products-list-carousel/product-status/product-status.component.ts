import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-status',
  templateUrl: './product-status.component.html',
  styleUrls: ['./product-status.component.css'],
})
export class ProductStatusComponent {
  @Input() product: any;

  get stock() {
    console.log('1');
    return this.product.stock > 50
      ? 'In stock'
      : this.product.stock <= 50 && this.product.stock > 10
      ? 'Limited stock'
      : this.product.stock <= 10 && this.product.stock > 1
      ? 'Last ' + this.product.stock + ' pieces'
      : this.product.stock === 1
      ? 'Last piece available'
      : 'Out of stock';
  }
}
