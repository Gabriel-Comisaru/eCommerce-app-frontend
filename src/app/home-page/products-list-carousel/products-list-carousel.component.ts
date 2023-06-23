import { Component, Input, SimpleChanges } from '@angular/core';
import { MockProductDetailed } from '../shared/mockProduct.model';

@Component({
  selector: 'app-products-list-carousel',
  templateUrl: './products-list-carousel.component.html',
  styleUrls: ['./products-list-carousel.component.css'],
})
export class ProductsListCarouselComponent {
  constructor() {}
  @Input() productsToDisplay!: MockProductDetailed[];

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['mockProductsList']);
  }

  stockStatus(stockValue: number) {
    if (stockValue > 50) {
    } else if (stockValue <= 50 && stockValue > 10) {
    } else if (stockValue <= 10 && stockValue > 1) {
    } else if (stockValue === 1) {
    } else if (stockValue === 0) {
    }
  }
}
