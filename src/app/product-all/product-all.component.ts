import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

import { MockProductModel} from "./shared/mock-product.model";
import { MockProductsService} from "./shared/mock-products.service";
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../product-categories/shared/categories.service";

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
  public categoryNames: Map<number,string> = new Map<number, string>()


  constructor(private productService: MockProductsService,
              private route: ActivatedRoute,
              private categoryService: CategoriesService
              ) {}

  ngOnInit(): void {
    let that = this;
    this.categoryService.getCategories().subscribe((list) => {
      this.categories = list.map((category: any) => {
        that.categoryNames.set(category.id, category.name);
      })
    })
    setTimeout(function() {
      that.productService.getProducts().subscribe((list) => {
        that.lalalala = list.map( (product: any) => {
          let placeholder = ''
          that.categoryService.getCategoryById(product.categoryId).subscribe((category) => {
            // debugger
            // setTimeout(function() {}, 1000);
            placeholder = category.name;
            // console.log(placeholder, 'placeholder...')
            // console.log(category.name, 'cat....name')
            return category.name;
          });

          // debugger

          return {
            id: product.id,
            name: product.name,
            photos: product.images,
            price: product.price,
            reviews: ['Nothing yet'],
            rating: product.rating,
            discount: product.discount,
            categoryId: product.categoryId,
            category: that.categoryNames.get(product.categoryId),
            description: product.description,
            stock: product.stock,
            userId: product.userId

          };
        });
        console.log('Product ---', that.lalalala);

        that.placeholder = that.lalalala;
        that.allprods = that.lalalala;

      });

    }, 100);


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
      this.lalalala = this.placeholder.filter((product: MockProductModel) => product.categoryId === this.selectedCategory.categoryId);
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
