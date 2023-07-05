import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductsService } from '../shared/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list-carousel',
  templateUrl: './products-list-carousel.component.html',
  styleUrls: ['./products-list-carousel.component.css'],
})
export class ProductsListCarouselComponent {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  @Input() productsToDisplay!: Product[];
  @Input() ProductsList!: Product[];
  public dataLoaded: boolean = false;
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.productsToDisplay && this.productsToDisplay.length > 0) {
      this.dataLoadingStatus();
    }
  }
  dataLoadingStatus() {
    this.dataLoaded = true;
  }
  addToCart(product: Product) {
    const shoppingCartList: Product[] = JSON.parse(
      localStorage.getItem('shoppingCart') || '[]'
    );
    if (shoppingCartList.some((element) => element.id === product.id)) {
      //TODO change quantity
    } else shoppingCartList.push(product);

    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartList));
    this.productsService.shoppingCartObservable.next(shoppingCartList);

    // if product already exists don't add it
  }
  addToFavorite(product: Product) {
    const favoriteProductsList: Product[] = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );
    if (favoriteProductsList.some((element) => element.id === product.id)) {
      //TODO change quantity
    } else favoriteProductsList.push(product);

    localStorage.setItem(
      'favoriteProducts',
      JSON.stringify(favoriteProductsList)
    );
    this.productsService.favoriteProductsObservable.next(
      favoriteProductsList
    );
  }
  getProductDetails(id: number) {
    this.router.navigate([`product-details/${id}`]);
  }
  getStock(stock: number) {
    return stock > 50
      ? 'In stock'
      : stock <= 50 && stock > 10
      ? 'Limited stock'
      : stock <= 10 && stock > 1
      ? 'Last ' + stock + ' pieces'
      : stock === 1
      ? 'Last piece available'
      : 'Out of stock';
  }
}
// <!-- notificare ca am adaugat in cos -->
// <!-- notificare ca am adaugat la favorite plus update badge-->
// for login:
//   login(username: string, password: string) {
//     return this.http
//       .post<any>(`${API_URL}/login`, {
//         username,
//         password,
//       })
//       .subscribe((user) => {
//         localStorage.setItem('user', JSON.stringify(user));
//         this.userSubject.next(user);
//       });
//   }

//   interceptor:
// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private userService: UserService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const userData = localStorage.getItem('user');
//     const isApiUrl = request.url.startsWith(API_URL);
//     if (userData && isApiUrl) {
//       const userToken = JSON.parse(userData).token;
//       request = request.clone({
//         setHeaders: {

//           Authorization: `Bearer ${userToken}`,
//         },
//       });
//     }

//     return next.handle(request);
//   }
// }
// TODO: make it nicer, no magic strings, use constants or enums
