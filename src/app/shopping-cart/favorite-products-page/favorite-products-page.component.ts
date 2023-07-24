import { Component } from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import { ProductsService } from 'src/app/home-page/shared/products.service';

@Component({
  selector: 'app-favorite-products-page',
  templateUrl: './favorite-products-page.component.html',
  styleUrls: ['./favorite-products-page.component.css'],
})
export class FavoriteProductsPageComponent {
  constructor(private productsService: ProductsService) {}

  favoriteProductsList: Product[] = [];

  ngOnInit() {
    this.productsService
      .getFavoriteProducts()
      .subscribe((res) => (this.favoriteProductsList = res));
  }

  deleteFavoriteProduct(productId: number) {
    this.productsService
      .deleteFavoriteProduct(productId)
      .subscribe

      // this.productsService.favoriteProductsObservable.next() - action:'delete'
      ();
  }

  moveProductToBasket(productId: number) {
    this.productsService
      .deleteFavoriteProduct(productId)
      .subscribe

      // this.productsService.addProductToOrder(productId)
      ();
  }
}
