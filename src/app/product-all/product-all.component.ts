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
  @Input () selectedCategory!: any;
  public mockProducts: MockProductModel[] = [];
  public categories: any[] = [];
  public placeholder: any[] = [];
  public allprods: any[] = [];
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
          category: product.categoryId,
          description: product.description,
          stock: product.stock,
          userId: product.userId
        };
      });
      this.placeholder = this.lalalala;
      this.allprods = this.lalalala;

    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory']) {
      this.applyFilters(this.route.snapshot.params['category']);
    }
  }

  applyFilters(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    console.log('Selected Category:', this.selectedCategory.categoryId);
    console.log(this.route.snapshot.params['category'])
    if (this.selectedCategory) {
      this.lalalala = this.placeholder.filter((product: MockProductModel) => product.category === this.selectedCategory.categoryId);
      console.log(this.lalalala);
    } else {
      console.log('No selected category');
    }
  }
  clearFilters(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    console.log('Selected Category:', this.selectedCategory.categoryId);
      this.lalalala = this.placeholder;
      console.log(this.lalalala);
      console.log('No selected category');
  }
}
