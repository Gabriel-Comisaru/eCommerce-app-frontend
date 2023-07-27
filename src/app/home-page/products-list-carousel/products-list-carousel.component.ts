import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductsService } from '../shared/products.service';
import { Router } from '@angular/router';
import { OrderItem } from '../shared/orderItem.model';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/shopping-cart/shared/basket.service';
import { FavoriteProductsServiceService } from '../shared/favorite-products-service.service';

import { BASE_URL_API } from 'src/app/settings';

@Component({
  selector: 'app-products-list-carousel',
  templateUrl: './products-list-carousel.component.html',
  styleUrls: ['./products-list-carousel.component.css'],
})
export class ProductsListCarouselComponent {
  @Input() productsToDisplay!: Product[];
  @Input() dataIsLoading!: boolean;

  public productsToDisplayWithImages!: Product[];
  public basketItems!: OrderItem[];
  public loading: boolean = false;
  public favoriteItems: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductsService,
    private favoriteProductsService: FavoriteProductsServiceService
  ) {}

  ngOnInit() {
    this.productService.getShopingCartObservable().subscribe((res) => {
      this.basketItems = res.basketOrderItems!;
    });
    this.favoriteProductsService.favoriteProductsObservable.subscribe((res) => {
      this.favoriteItems = res.favoriteProducts!;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.productsToDisplay && this.productsToDisplay.length > 0) {
    }

    this.productsToDisplayWithImages = this.productsToDisplay.map((product) => {
      //TODO REFACTOR THE MAP

      // if an image already exists use it otherwise replace it with a placeholder
      if (product.imagesName.length > 0 && product.imagesName[0].length > 0) {
        const url = `${BASE_URL_API}/images/download?name=${product.imagesName[0]}`;

        return {
          ...product,
          roundedRating: Math.floor(product.rating),
          productImage: url,
          loadingCart: false,
          loadingFavorite: false,
        };
      }
      return {
        ...product,
        productImage: '/assets/images/product-not-found.png',
        roundedRating: Math.floor(product.rating),
        loadingCart: false,
        loadingFavorite: false,
      };
    });
  }

  addToCart(product: Product) {
    this.productService.addToCart(product, this.basketItems);
    this.loadingButton(product, 'cart');
  }

  getProductDetails(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src =
      '/assets/images/product-not-found.png';
  }
  addToFavorite(product: Product) {
    this.favoriteProductsService.addToFavorite(product, this.favoriteItems);
    this.loadingButton(product, 'favorite');
  }
  loadingButton(product: any, buttonType: string) {
    if (buttonType === 'cart') {
      product.loadingCart = true;

      setTimeout(() => {
        product.loadingCart = false;
      }, 150);
    } else if (buttonType === 'favorite') {
      product.loadingFavorite = true;

      setTimeout(() => {
        product.loadingFavorite = false;
      }, 150);
    }
  }
  checkIfFavorite(product: Product) {
    return this.favoriteItems.some((el) => el.id === product.id);
  }
  isUserLoggedIn() {
    return !localStorage.getItem('currentUser');
  }
}

// <!-- notificare ca am adaugat in cos -->
// <!-- notificare ca am adaugat la favorite plus update badge-->
