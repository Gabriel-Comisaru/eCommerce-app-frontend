import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductsService } from '../shared/products.service';
import { Router } from '@angular/router';
import { OrderItem } from '../shared/orderItem.model';
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
      return {
        ...product,
        productImage:
          product.imagesName.length > 0 && product.imagesName[0].length > 0
            ? `${BASE_URL_API}/images/download?name=${product.imagesName[0]}`
            : '/assets/images/product-not-found.png',
        roundedRating: Math.floor(product.rating),
        loadingCart: false,
        loadingFavorite: false,
      };
    });
  }
  addToCart(product: Product) {
    if (product.loadingCart) {
      return;
    }
    product.loadingCart = true;
    this.productService
      .addToCart(product, this.basketItems)
      .subscribe(() => (product.loadingCart = false));
  }

  getProductDetails(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src =
      '/assets/images/product-not-found.png';
  }

  addToFavorite(product: Product) {
    if (product.loadingFavorite) {
      return;
    }
    product.loadingFavorite = true;
    this.favoriteProductsService
      .addToFavorite(product, this.favoriteItems)
      .subscribe(() => {
        product.loadingFavorite = false;
      });
  }

  checkIfFavorite(product: Product) {
    return this.favoriteItems.some((el) => el.id === product.id);
  }

  isUserLoggedIn() {
    return !localStorage.getItem('currentUser');
  }
}
