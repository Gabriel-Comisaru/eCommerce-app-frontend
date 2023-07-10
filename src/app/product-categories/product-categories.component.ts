import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../home-page/shared/products.service';
import { Product } from '../home-page/shared/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  public mockProducts: Product[] = [];
  public categories: { category: string; image: string }[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((list) => {
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

      this.generateCategoryImages();
    });
  }
  generateCategoryImages(): void {
    const categories = Array.from(
      new Set(this.mockProducts.map((product) => product.category))
    );

    this.categories = categories.map((category) => {
      const productsInCategory = this.mockProducts.filter(
        (product) => product.category === category
      );
      const randomProduct =
        productsInCategory[
          Math.floor(Math.random() * productsInCategory.length)
        ];

      return {
        category: category,
        image: randomProduct?.images[0] || '', // Use the first image of the random product, or an empty string if no product found
      };
    });
  }
}
