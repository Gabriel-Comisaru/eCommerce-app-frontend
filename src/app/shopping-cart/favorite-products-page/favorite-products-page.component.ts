import { Component } from '@angular/core';
import { FavoriteProductsServiceService } from 'src/app/home-page/shared/favorite-products-service.service';
import { OrderItem } from 'src/app/home-page/shared/orderItem.model';
import { Product } from 'src/app/home-page/shared/product.model';
import { ProductsService } from 'src/app/home-page/shared/products.service';
import { BASE_URL_API } from 'src/app/settings';
@Component({
  selector: 'app-favorite-products-page',
  templateUrl: './favorite-products-page.component.html',
  styleUrls: ['./favorite-products-page.component.css'],
})
export class FavoriteProductsPageComponent {
  constructor(
    private productsService: ProductsService,
    private favoriteProductsService: FavoriteProductsServiceService
  ) {}

  favoriteProductsList: Product[] = [];
  basketItems: OrderItem[] = [];
  rows: number[] = [5, 10, 15];
  row: number = 5;
  public orderedItemsIds: number[] = [];

  ngOnInit() {
    this.productsService.getShopingCartObservable().subscribe((res) => {
      this.basketItems = res.basketOrderItems!;
    });
    this.favoriteProductsService.favoriteProductsObservable.subscribe(
      (res) => (this.favoriteProductsList = res.favoriteProducts!)
    );
  }

  deleteFavoriteProduct(product: Product) {
    this.favoriteProductsService.deleteFavoriteProduct(product.id).subscribe();
  }

  moveProductToBasket(product: Product) {
    if (product.loadingCart) {
      return;
    }
    product.loadingCart = true;
    this.productsService
      .addToCart(product, this.basketItems)
      .subscribe(() => (product.loadingCart = false));
  }

  getTotalPrice(): string {
    let totalPrice = 0;
    this.favoriteProductsList.forEach((item: any) => {
      totalPrice += item.price;
    });
    return totalPrice.toFixed(2);
  }

  getItemPrice(item: any) {
    return (item.productPrice * item.quantity).toFixed(2);
  }
  getProductImage(productImage: string) {
    return `${BASE_URL_API}/images/download?name=${productImage}`;
  }
}
