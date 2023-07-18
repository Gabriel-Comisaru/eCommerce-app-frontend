import { Component, OnInit } from '@angular/core';
import { Product } from '../home-page/shared/product.model';
import { Router } from '@angular/router';
import { CategoriesService } from './shared/categories.service';
import { ProductsService } from '../home-page/shared/products.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  public categories: any[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    const list = await this.categoryService.getCategories().toPromise();
    this.categories = await Promise.all(list.map(async (category: any) => {
      const categoryId = category.id;
      const categoryName = category.name;
      const productNo = category.productIds.length;
      const productIds = category.productIds;
      const image = await this.getFirstProductImageUrl(productIds);
      return {
        categoryId,
        categoryName,
        productNo,
        image
      };
    }));
  }

  async getFirstProductImageUrl(productIds: any): Promise<string | undefined> {
    if (productIds && productIds.length > 0) {
      const firstProductId = productIds[0];
      const firstProduct = await this.productService.getProduct(firstProductId).toPromise();
      if (firstProduct && firstProduct.imagesName && firstProduct.imagesName.length > 0) {
        const imageName = firstProduct.imagesName[0];
        const imageUrl = `http://localhost:8081/api/images/download?name=${imageName}`;
        return imageUrl;
      }
    }

    return undefined;
  }

  navigateToProducts(category: any): void {
    this.router.navigate(['/products'], { queryParams: { categoryId: category } });
  }
}
