import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, tap } from 'rxjs';
import { Product } from './product.model';
import { Category } from './category.model';
import { OrderItem } from './orderItem.model';
import { Review } from './review.model';
import { AuthService } from 'src/app/helpers/auth.service';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // private productsUrl = 'https://dummyjson.com/products';
  private productsUrl = 'http://localhost:8080/api/products';
  private reviewsUrl = 'http://localhost:8080/api/reviews';
  categoriesUrl = 'http://localhost:8080/api/categories';
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

  // i want to add it in cartList or favoriteList

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

  getToken(username: string, password: string): Observable<any> {
    const loginUrl = `http://localhost:8080/auth/login?username=${username}&password=${password}`;
    return this.httpClient.post<any>(loginUrl, '');
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoriesUrl);
  }

  orderItemsUrl = 'http://localhost:8080/api/orderItems';

  getOrderItems(): Observable<OrderItem[]> {
    return this.httpClient.get<OrderItem[]>(this.orderItemsUrl);
  }

  addProductToOrder(
    productId: number,
    quantity: number
  ): Observable<OrderItem[]> {
    const addProductToOrderUrl = `http://localhost:8080/api/orderItems/${productId}`;
    const productBody = {
      quantity,
    };
    return this.httpClient.post<OrderItem[]>(addProductToOrderUrl, productBody);
  }
  // do model for that id quantity productId orderId
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
