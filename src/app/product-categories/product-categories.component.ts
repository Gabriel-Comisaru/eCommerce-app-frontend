import {Component, OnInit} from '@angular/core';
import {MockProductModel} from "../product-all/shared/mock-product.model";
import {MockProductsService} from "../product-all/shared/mock-products.service";
import {Router} from "@angular/router";
import {CategoriesService} from "./shared/categories.service";

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  public mockProducts: MockProductModel[] = [];
  // public categories: { category: string, image: string }[] = [];
  public categories: { categoryName: string, categoryId : number, productNo: number }[] = [];
// public categories: string[] = [];

  constructor(private productService: MockProductsService,
              private router: Router,
              private categoryService: CategoriesService
              ) {}

  ngOnInit(): void {
    // this.productService.getMockProducts().subscribe((list) => {
    //   this.mockProducts = list.products.map((product: any) => {
    //     return {
    //       id: product.id,
    //       name: product.title,
    //       photos: product.images,
    //       price: product.price,
    //       reviews: ['Nothing yet'],
    //       rating: product.rating,
    //       discount: product.discount,
    //       category: product.category,
    //       description: product.description,
    //       stock: product.stock,
    //     };
    //   });
    //
    //   this.generateCategoryImages();
    //
    // });
    this.categoryService.getCategories().subscribe((list) => {
      this.categories = list.map((category: any) => {
        return {
          categoryId: category.id,
          categoryName: category.category,
          productNo: category.productIds.length
          // image: category.image
        };
      })
    })

  }
  // generateCategoryImages(): void {
  //   const categories = Array.from(new Set(this.mockProducts.map(product => product.category)));
  //
  //   this.categories = categories.map(category => {
  //     const productsInCategory = this.mockProducts.filter(product => product.category === category);
  //     const randomProduct = productsInCategory[Math.floor(Math.random() * productsInCategory.length)];
  //
  //     return {
  //       category: category,
  //       image: randomProduct?.photos[0] || '' // Use the first image of the random product, or an empty string if no product found
  //     };
  //   });
  // }

}
