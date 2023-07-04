import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

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
  public mockProducts: MockProductModel[] = [];
  public categories: any[] = [];
  public placeholder: any[] = [];
  public lalalala: any[] = [];


  constructor(private productService: MockProductsService,
              private route: ActivatedRoute,
              private categoryService: MockProductsService
              ) {}

  ngOnInit(): void {

    this.productService.getProducts().subscribe((list) => {
      this.lalalala = list.map((product: any) => {
        return {
          id: product.id,
          name: product.name,
          photos: product.images,
          price: product.price,
          reviews: ['Nothing yet'],
          rating: product.rating,
          discount: product.discount,
          category: product.category,
          description: product.description,
          stock: product.stock,
          userId: product.userId
        };
      });
    });
    this.placeholder = this.lalalala;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory']) {
      this.applyFilters(this.selectedCategory);
    }
  }

  applyFilters(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    console.log('Selected Category:', this.selectedCategory);
    if (this.selectedCategory) {
      this.lalalala = this.lalalala.filter((product: MockProductModel) => product.category === this.selectedCategory);
      console.log(this.lalalala);
    } else {
      console.log('No selected category');
    }
  }
  clearFilters(selectedCategory: string) {
    this.lalalala = this.placeholder
  }
}
