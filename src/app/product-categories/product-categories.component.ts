import {Component, OnInit} from '@angular/core';
import {MockProductModel} from "../product-all/shared/mock-product.model";
import {MockProductsService} from "../product-all/shared/mock-products.service";

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  public mockProducts: MockProductModel[] = [];
  public categories: { category: string, image: string }[] = [];


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

      this.generateCategoryImages();

    });
  }
  generateCategoryImages(): void {
    const categories = Array.from(new Set(this.mockProducts.map(product => product.category)));

    this.categories = categories.map(category => {
      const productsInCategory = this.mockProducts.filter(product => product.category === category);
      const randomProduct = productsInCategory[Math.floor(Math.random() * productsInCategory.length)];

      return {
        category: category,
        image: randomProduct?.photos[0] || '' // Use the first image of the random product, or an empty string if no product found
      };
    });
  }

}
