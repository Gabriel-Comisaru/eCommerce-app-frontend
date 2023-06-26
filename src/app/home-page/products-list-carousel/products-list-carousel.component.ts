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

  addToCart(product: MockProductDetailed) {}
  addToFavorite(product: MockProductDetailed) {}
}
// <!-- notificare ca am adaugat in cos -->
// <!-- notificare ca am adaugat la favorite plus update badge-->
