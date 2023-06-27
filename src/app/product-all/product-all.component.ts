import {Component, Input, OnInit} from '@angular/core';

import { MockProductModel} from "./shared/mock-product.model";
import { MockProductsService} from "./shared/mock-products.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {
  @Input () selectedCategory!: string;
  @Input ()
  public mockProducts: MockProductModel[] = [];
  public categories: any[] = [];
  public placeholder: MockProductModel[] = [];


  constructor(private productService: MockProductsService,
              private route: ActivatedRoute) {}

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
      this.placeholder = this.mockProducts
      this.route.paramMap.subscribe(params => {
        const category = params.get('category');
        if (category) {
          this.selectedCategory = category;
          this.applyFilters();
        }});
    });

  }
  // applyFilters(selectedCategory?: string) {
  //   console.log('Selected Category:', selectedCategory);
  //   if(selectedCategory) {
  //     this.mockProducts = this.mockProducts.filter((product: MockProductModel) => product.category === selectedCategory);
  //     console.log(this.mockProducts)
  //   } else  {
  //     console.log('No selected category');
  //   }
  //
  // }
  applyFilters() {
    console.log('Selected Category:', this.selectedCategory);
    if (this.selectedCategory) {
      this.mockProducts = this.placeholder.filter((product: MockProductModel) => product.category === this.selectedCategory);
      console.log(this.mockProducts);
    } else {
      console.log('No selected category');
    }
  }
  clearFilters(selectedCategory: string) {
    this.mockProducts = this.placeholder
  }
}
