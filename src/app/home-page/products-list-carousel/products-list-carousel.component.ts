import { Component, Input } from '@angular/core';
import { MockProductDetailed } from '../shared/mockProduct.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list-carousel',
  templateUrl: './products-list-carousel.component.html',
  styleUrls: ['./products-list-carousel.component.css'],
})
export class ProductsListCarouselComponent {
  constructor(private router: Router) {}
  @Input() mockProductsList!: MockProductDetailed[];

  ngOnInit() {}

  getProductDetails(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }
}
