import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductsService } from '../shared/products.service';
import { Router } from '@angular/router';
import { OrderItem } from '../shared/orderItem.model';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/shopping-cart/shared/basket.service';

@Component({
  selector: 'app-products-list-carousel',
  templateUrl: './products-list-carousel.component.html',
  styleUrls: ['./products-list-carousel.component.css'],
})
export class ProductsListCarouselComponent {
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private authService: AuthService,
    private basketService: BasketService
  ) {}
  @Input() productsToDisplay!: Product[];
  @Input() dataIsLoading!: boolean;

  private orderItems: OrderItem[] = [];
  public productsToDisplayWithImages!: Product[];

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.productsToDisplay && this.productsToDisplay.length > 0) {
    }

    this.productsToDisplayWithImages = this.productsToDisplay.map((product) => {
      //TODO REFACTOR THE MAP

      // if an image already exists use it otherwise replace it with a placeholder
      if (product.imagesName.length > 0 && product.imagesName[0].length > 0) {
        const url = `http://localhost:8081/api/images/download?name=${product.imagesName[0]}`;

        return {
          ...product,
          roundedRating: Math.floor(product.rating),
          productImage: url,
        };
      }
      return {
        ...product,
        productImage: '/assets/images/product-not-found.png',
        roundedRating: Math.floor(product.rating),
      };
    });
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
  addToFavorite(product: Product) {
    if (this.authService.isAuthenticated()) {
      if (this.getFavoriteStatus(product)) {
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
  getProductDetails(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src =
      '/assets/images/product-not-found.png';
  }

  getFavoriteStatus(product: Product) {
    // eu tb sa fac request catre server ca altfel nu vede - teoretic sa fac get sau sa filter it you of user Ids
    const isFavorite = product.favUserIds.some((id) => id === product.userId);
    return isFavorite;
  }
}
// <!-- notificare ca am adaugat in cos -->
// <!-- notificare ca am adaugat la favorite plus update badge-->
