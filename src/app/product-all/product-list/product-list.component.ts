import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import { BasketService } from '../../shopping-cart/shared/basket.service';
import { CategoriesService } from '../../product-categories/shared/categories.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/home-page/shared/products.service';
import { BehaviorSubject } from 'rxjs';
import {
  OrderItem,
  actionOrderItem,
} from '../../home-page/shared/orderItem.model';
import { Order } from 'src/app/home-page/shared/order.model';
import { ProductOperationsService } from 'src/app/home-page/shared/product-operations.service';

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
    private mockproductService: CategoriesService,
    private productsService: ProductsService,
    private productOperationsService: ProductOperationsService
  ) {
    this.totalRows$?.next(0);
  }

  displayedRows = 8;
  incrementRows = 6;
  sortOptions: string[] = ['Price', 'Name', 'Default'];
  selectedSortOption: string = 'Default';

  ngOnInit(): void {
    this.mockproductService.getCategories().subscribe((res) => {
      this.loading = false;
    });
  }

  addToBasket(product: Product, event: any): void {
    event.stopPropagation();
    this.productOperationsService.addToCart(product);
  }

  getProductDetails(id: number, event: any) {
    event.stopPropagation();
    this.router.navigate([`product-details/${id}`]);
  }
  addToFavorite(product: Product, event: any) {
    event.stopPropagation();
    this.productOperationsService.addToFavorite(product);
  }

  loadMoreRows(): void {
    this.displayedRows += this.incrementRows;
    this.totalRows$?.next(this.displayedRows);
  }

  sortProducts() {
    console.log(this.selectedSortOption, 'asdasd');
    if (this.selectedSortOption === 'Price') {
      console.log('price');
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
