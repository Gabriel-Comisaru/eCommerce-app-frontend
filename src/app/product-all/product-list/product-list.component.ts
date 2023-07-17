import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import { BasketService } from '../../shopping-cart/shared/basket.service';
import { CategoriesService } from '../../product-categories/shared/categories.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {BehaviorSubject} from "rxjs";

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

  constructor(
    private basketService: BasketService,
    private router: Router,
    private authService: AuthService,
    private mockproductService: CategoriesService
  ) {
    this.totalRows$?.next(0);
  }

  displayedRows = 8;
  incrementRows = 6;

  ngOnInit(): void {
    console.log(this.totalRows, this.displayedRows)
    this.mockproductService.getCategories().subscribe();
  }

  addToBasket(product: Product, event: any): void {
    if (this.authService.isAuthenticated()) {
      event.stopPropagation();
      this.basketService.createOrder(product.id);
    } else {
      this.router.navigate(['login']);
    }
  }


  getProductDetails(id: number, event: any) {
    event.stopPropagation();
    this.router.navigate([`product-details/${id}`]);
  }
  addToFavorite(product: Product, event: any) {
    if (this.authService.isAuthenticated()) {
    } else {
      this.router.navigate(['login']);
    }
  }
  loadMoreRows(): void {
    this.displayedRows += this.incrementRows;
    this.totalRows$?.next(this.displayedRows);
  }

}
