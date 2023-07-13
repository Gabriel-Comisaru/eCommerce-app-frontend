import {Component, OnInit} from '@angular/core';
import { Product } from '../home-page/shared/product.model';
import {Router} from "@angular/router";
import {CategoriesService} from "./shared/categories.service";
import { ProductsService } from '../home-page/shared/products.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  public mockProducts: Product[] = [];
  // public categories: { category: string, image: string }[] = [];
  public categories: any = [];

// public categories: string[] = [];

  constructor(private productService: ProductsService,
              private router: Router,
              private categoryService: CategoriesService
  ) {
  }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((list) => {
      this.categories = list.map((category: any) => {
        return {
          categoryId: category.id,
          categoryName: category.name,
          productNo: category.productIds.length
          // image: category.image
        };
      })
    })

  }


  navigateToProducts(category: any) {
    this.router.navigate(['/products'], {queryParams: {category: category}});
  };
}
// import { Component, OnInit } from '@angular/core';
// import { MockProductModel } from "../product-all/shared/mock-product.model";
// import { MockProductsService } from "../product-all/shared/mock-products.service";
// import { Router } from "@angular/router";
// import { CategoriesService } from "./shared/categories.service";
//
// @Component({
//   selector: 'app-product-categories',
//   templateUrl: './product-categories.component.html',
//   styleUrls: ['./product-categories.component.css']
// })
// export class ProductCategoriesComponent implements OnInit {
//
//   public mockProducts: MockProductModel[] = [];
//   public categories: { categoryName: string, categoryId: number, productNo: number }[] = [];
//
//   constructor(
//     private productService: MockProductsService,
//     private router: Router,
//     private categoryService: CategoriesService
//   ) {}
//
//   ngOnInit(): void {
//     this.categoryService.getCategories().subscribe((list) => {
//       this.categories = list.map((category: any) => {
//         return {
//           categoryId: category.id,
//           categoryName: category.name,
//           productNo: category.productIds.length
//         };
//       });
//     });
//   }
//
//   navigateToProducts(categoryId: number) {
//     this.router.navigate(['/products'], { queryParams: { category: categoryId } });
//   }
//
// }
