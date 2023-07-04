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
  public productsWithDiscountApplied: MockProductDetailed[] = [];
  public mostSelledProducts: MockProductDetailed[] = [];
  public isLoggedIn: boolean = true; //set to default true just for display purposes
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

      if (this.mockProductsList) {
        this.productsWithDiscountApplied = this.mockProductsList.filter(
          (product) => product.discount > 0
        );

        this.mostSelledProducts = this.mockProductsList.filter(
          (product) => product.price < 200
        );
      }
    });
  }
}

// trebuie sa mai fac serviciul de search
// si atunci cand fac searchul sa mi se modifice ruta

//add to cart service
//add to favorite service
