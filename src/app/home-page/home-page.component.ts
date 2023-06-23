import { Component } from '@angular/core';

import { MockProductsService } from './shared/mock-products.service';
import { MockProductDetailed } from './shared/mockProduct.model';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  public mockProductsList!: MockProductDetailed[];
  public isLoggedIn: boolean = false;
  constructor(private mockProductsService: MockProductsService) {}
  ngOnInit() {
    // getting mock list of products and mapping it according to my interface
    this.mockProductsService.getMockProducts().subscribe((list) => {
      this.mockProductsList = list.products.map((product: any) => {
        return {
          id: product.id,
          name: product.title,
          photos: product.images,
          price: product.price,
          rating: Math.floor(product.rating),
          reviews: ['No reviews available'],
          discount: product.discountPercentage,
          category: product.category,
          description: product.description,
          stock: product.stock,
        };
      });
    });
  }
}
