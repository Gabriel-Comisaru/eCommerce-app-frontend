import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, tap } from 'rxjs';
import { Product } from './product.model';
import { Review } from './review.model';
import { AuthService } from 'src/app/helpers/auth.service';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  // private productsUrl = 'https://dummyjson.com/products';
  private productsUrl = 'http://localhost:8080/api/products';
  private categoriesUrl = 'http://localhost:8080/api/categories'
  private reviewsUrl = 'http://localhost:8080/api/reviews';

  public shoppingCartObservable = new Subject<Product[]>();
  public favoriteProductsObservable = new Subject<Product[]>();

  setInitialCartProducts() {
    const localStorageCartList = JSON.parse(
      localStorage.getItem('shoppingCart') || '[]'
    );
    this.shoppingCartObservable.next(localStorageCartList);
  }
  getShopingCartObservable(): Observable<Product[]> {
    return this.shoppingCartObservable.asObservable();
  }

  setInitialFavoriteProducts() {
    const localStorageCartList = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );
    this.favoriteProductsObservable.next(localStorageCartList);
  }
  getfavoriteProductsObservable(): Observable<Product[]> {
    return this.favoriteProductsObservable.asObservable();
  }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.productsUrl);
  }

  getCategories(): Observable<any> {
    return this.httpClient.get<any>(this.categoriesUrl);
  }

  // i want to add it in cartList or favoriteList
  addProduct(
    product: Product,
    url: string
  ): Observable<Product> {
    return this.httpClient.post<Product>(url, product);
  }

  // searchItem(value: string): Observable<Product[]> {
  //   if (!value.trim()) {
  //     return of([]);
  //   }
  //   return this.httpClient
  //     .get<Product>(`${this.ProductsUrl}/?search=${value}`)
  //     .pipe(
  //       tap(
  //       )
  //     );
  // }
  getProduct(id: number): Observable<any | undefined> {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClient.get(url);
  }

  saveProducts(product: any): Observable<any> {
    return this.httpClient.post<any>(this.productsUrl + '/add', product);
  }

  updateProduct(product: any, id: number): Observable<any> {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClient.put<any>(url, product);
  }

  delete(id: number) {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClient.delete(url);
  }

  saveReview(productId: number, review: Review) {
    const url = `${this.reviewsUrl}/save/${productId}`;
    this.httpClient.post<any>(url, review).subscribe();
  }

  //waiting for the route to be available
  getProductReviews(productId: Number): Observable<any> {
    const url = `${this.reviewsUrl}/product/${productId}`;
    return this.httpClient.get<any>(url);
  }
}
