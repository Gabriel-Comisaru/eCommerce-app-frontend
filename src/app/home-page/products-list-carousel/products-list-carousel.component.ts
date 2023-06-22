import { Component, Input } from '@angular/core';
import { MockProductDetailed } from '../shared/mockProduct.model';

@Component({
  selector: 'app-products-list-carousel',
  templateUrl: './products-list-carousel.component.html',
  styleUrls: ['./products-list-carousel.component.css'],
})
export class ProductsListCarouselComponent {
  constructor() {}
  @Input() mockProductsList!: MockProductDetailed[];

  ngOnInit() {}
}
