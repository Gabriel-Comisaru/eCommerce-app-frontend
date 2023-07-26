import { Component } from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import { ProductsService } from 'src/app/home-page/shared/products.service';

@Component({
  selector: 'app-favorite-products-page',
  templateUrl: './favorite-products-page.component.html',
  styleUrls: ['./favorite-products-page.component.css'],
})
export class FavoriteProductsPageComponent {
  constructor(
    private productsService: ProductsService,
  ) {}

  favoriteProductsList: Product[] = [];

  //

  rows: number[] = [5, 10, 15];
  row: number = 5;
  public orderedItemsIds: number[] = [];
  //
  ngOnInit() {
    this.productsService.getFavoriteProducts().subscribe((res) => {
      this.favoriteProductsList = res;
    });
  }

  deleteFavoriteProduct(product: Product) {
    this.productsService.deleteFavoriteProduct(product.id).subscribe((res) => {
      this.productsService.favoriteProductsObservable.next({
        productAction: 'delete',
        favoriteProduct: product,
      });
      this.favoriteProductsList = this.favoriteProductsList.filter(
        (favProduct) => favProduct.id !== product.id
      );
    });
  }

  moveProductToBasket(product: Product) {
    // this.deleteFavoriteProduct(product);
    // // if delete fails for some reason it will still add my product to cart
    this.productsService.addProductToOrder(product.id, 1).subscribe((res) => {

    });
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
  showProductImage(productImage: string) {
    return this.productsService.getProductImage(productImage);
  }
}
