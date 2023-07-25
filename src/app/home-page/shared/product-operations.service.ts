import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductOperationsService {
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private authService: AuthService
  ) {}

  addToFavorite(product: Product) {
    if (this.authService.isAuthenticated()) {
      if (product.favUserIds.includes(product.userId)) {
        // if product already exists the favorite list delete it
        this.productsService
          .deleteFavoriteProduct(product.id)
          .subscribe((res) => {
            this.productsService.favoriteProductsObservable.next({
              productAction: 'delete',
              favoriteProduct: product,
            });
            product.favUserIds = product.favUserIds.filter(
              (id) => id !== product.userId
            );
          });
      } else {
        this.productsService.addFavoriteProduct(product.id).subscribe((res) => {
          this.productsService.favoriteProductsObservable.next({
            productAction: 'add',
            favoriteProduct: product,
          });

          product.favUserIds.push(product.userId);
        });
      }
    } else {
      this.router.navigate(['login']);
    }
  }

  addToCart(product: Product) {
    if (this.authService.isAuthenticated()) {
      this.productsService.addProductToOrder(product.id, 1).subscribe((res) => {
        this.productsService.shoppingCartObservable.next({
          orderItem: res,
          productAction: 'add',
        });
      });
    } else {
      this.router.navigate(['login']);
    }
  }
  getProductImage(productImage: string) {
    return `http://localhost:8081/api/images/download?name=${productImage}`;
  }
}
