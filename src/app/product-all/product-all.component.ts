import {Component, Input, OnInit} from '@angular/core';

import { MockProductModel} from "./shared/mock-product.model";
import { MockProductsService} from "./shared/mock-products.service";

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {
  @Input () selectedCategory!: string;

  public mockProducts: MockProductModel[] = [];
  public categories: any[] = [];


  constructor(private productService: MockProductsService) {}

  ngOnInit(): void {
    this.productService.getMockProducts().subscribe((list) => {
      this.mockProducts = list.products.map((product: any) => {
        return {
          id: product.id,
          name: product.title,
          photos: product.images,
          price: product.price,
          reviews: ['Nothing yet'],
          rating: product.rating,
          discount: product.discount,
          category: product.category,
          description: product.description,
          stock: product.stock,
        };
      });
      this.categories = Array.from(new Set(this.mockProducts.map(product => product.category)));


    });
  }
  applyFilters(selectedCategory: string) {
    console.log('Selected Category:', selectedCategory);
    if(selectedCategory) {
      this.mockProducts = this.mockProducts.filter((product: MockProductModel) => product.category === selectedCategory);
      console.log(this.mockProducts)
    } else {
      console.log('No selected category');
    }

  }

}
