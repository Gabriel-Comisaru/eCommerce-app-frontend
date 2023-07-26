import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import { BasketService } from '../../shopping-cart/shared/basket.service';
import { CategoriesService } from '../../product-categories/shared/categories.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/home-page/shared/products.service';
import { BehaviorSubject } from 'rxjs';
import { FavoriteProductsServiceService } from 'src/app/home-page/shared/favorite-products-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() mockProduct!: Product[];
  @Input() filteredList!: Product[];
  @Input() totalRows!: number;
  totalRows$?: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  loading: boolean = true;

  constructor(
    private basketService: BasketService,
    private router: Router,
    private authService: AuthService,
    private mockProductService: CategoriesService,
    private productService: ProductsService,
    private favoriteProductsService: FavoriteProductsServiceService
  ) {
    this.totalRows$?.next(0);
  }

  displayedRows = 8;
  incrementRows = 6;
  sortOptions: string[] = ['Price', 'Name', 'Default'];
  selectedSortOption: string = 'Default';

  ngOnInit(): void {
    this.mockProductService.getCategories().subscribe(() => {
      this.loading = false;
    });
  }

  addToBasket(product: Product, event: any): void {
    event.stopPropagation();
    this.productService.addToCart(product);
  }

  getProductDetails(id: number, event: any) {
    event.stopPropagation();
    this.router.navigate([`product-details/${id}`]);
  }
  addToFavorite(product: Product, event: any) {
    event.stopPropagation();
    this.favoriteProductsService.addToFavorite(product);
  }

  loadMoreRows(): void {
    this.displayedRows += this.incrementRows;
    this.totalRows$?.next(this.displayedRows);
  }

  sortProducts() {
    if (this.selectedSortOption === 'Price') {
      this.filteredList.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (this.selectedSortOption === 'Name') {
      this.filteredList.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (this.selectedSortOption === 'Default') {
      this.filteredList.sort((a, b) => {
        return a.id - b.id;
      });
    }
  }
}
