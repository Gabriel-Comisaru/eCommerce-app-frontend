import {Component, Input, OnInit} from '@angular/core';
import {MockProductModel} from "../shared/mock-product.model";
import {MockProductsService} from "../shared/mock-products.service";

@Component({
  selector: 'app-product-all-list',
  templateUrl: './product-all-list.component.html',
  styleUrls: ['./product-all-list.component.css']
})
export class ProductAllListComponent implements OnInit{
  @Input () selectedCategory!: string;
  public mockProducts: MockProductModel[] = [];
  public categories: any[] = [];
  public filteredProducts: MockProductModel[] = [];
  // public selectedCategory: string = '';


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
      this.filteredProducts = this.mockProducts; // Initialize filteredProducts with all products

    });
  }

  applyFilters(selectedCategory: string) {
    console.log('Selected Category:', selectedCategory);
    selectedCategory
      ? this.mockProducts.filter((product: MockProductModel) => product.category === this.selectedCategory) && console.log(this.mockProducts)
      : this.mockProducts && console.log('aaa');

  }

}
