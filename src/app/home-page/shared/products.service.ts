import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from './product.model';
import { Category } from './category.model';
import { OrderItem } from './orderItem.model';
import { Review } from './review.model';
import { BASE_URL_API } from '../../settings';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  private productsUrl = `${BASE_URL_API}/products`;
  private productsUrlDisplay = `${BASE_URL_API}/products/display`;
  private appUsersUrl = 'http://localhost:8081/api/users';
  private categoriesUrl = 'http://localhost:8081/api/categories';
  private reviewsUrl = 'http://localhost:8081/api/reviews';
  private productCategoryUrl = 'http://localhost:8081/api/products/category';
  private imageUrl = 'http://localhost:8081/api/images/upload';
  private ordersUrl = 'http://localhost:8081/api/orders';
  private orderItemsUrl = 'http://localhost:8081/api/orderItems';
  // public shoppingCartObservable = new Subject<Product[]>();
  public shoppingCartObservable = new Subject<{
    orderItem?: OrderItem;
    productAction: string;
    basketOrderItems?: OrderItem[];
  }>();
  public favoriteProductsObservable = new Subject<Product>();
  checkIfAdminIsOnAdminPage: BehaviorSubject<any> = new BehaviorSubject<any>(
    ''
  );

  getShopingCartObservable(): Observable<{
    orderItem?: OrderItem;
    productAction: string;
    basketOrderItems?: OrderItem[];
  }> {
    return this.shoppingCartObservable.asObservable();
  }

  setInitialFavoriteProducts() {
    const localStorageCartList = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );
    this.favoriteProductsObservable.next(localStorageCartList);
  }

  getAllUsers() {
    return this.httpClient.get<any>(this.appUsersUrl);
  }

  // getfavoriteProductsObservable(): Observable<Product[]> {
  //   return this.favoriteProductsObservable.asObservable();
  // }

  getOrdersItems(): Observable<any> {
    return this.httpClient.get<any>(this.orderItemsUrl);
  }

  getOrders(): Observable<any> {
    const url = `${this.ordersUrl}/display`;
    return this.httpClient.get<any>(url, {
      params: new HttpParams().set('pageSize', '10'),
    });
  }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.productsUrl);
  }

  getProductsDisplay(): Observable<any> {
    return this.httpClient.get<any>(this.productsUrlDisplay, {
      params: new HttpParams().set('pageSize', '10'),
    });
  }

  getProductsByCat(categoryId: number): Observable<any> {
    let url = `${this.productsUrl}/category?categoryId=${categoryId}`;
    return this.httpClient.get<any>(url);
  }

  // i want to add it in cartList or favoriteList

  getProduct(id: number): Observable<any | undefined> {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClient.get(url);
  }

  saveProducts(product: any, categoryId: number): Observable<any> {
    return this.httpClient.post<any>(
      `${this.productCategoryUrl}/${categoryId}`,
      product
    );
  }

  updateProduct(product: any, id: number): Observable<any> {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClient.put<any>(url, product);
  }

  updateStatus(id: number, status: string): Observable<any> {
    const url = `${this.ordersUrl}/${id}?status=${status}`;
    return this.httpClient.put(url, status);
  }

  delete(id: number) {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }

  deleteOrder(id: number) {
    const url = `${this.ordersUrl}/${id}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoriesUrl);
  }

  getOrderItems(): Observable<OrderItem[]> {
    return this.httpClient.get<OrderItem[]>(this.orderItemsUrl);
  }

  addProductToOrder(
    productId: number,
    quantity: number
  ): Observable<OrderItem> {
    const addProductToOrderUrl = `http://localhost:8081/api/orders/${productId}?quantity=${quantity}`;

    return this.httpClient.post<OrderItem>(addProductToOrderUrl, {});
  }

  // do model for that id quantity productId orderId
  saveReview(productId: number, review: Review) {
    const url = `${this.reviewsUrl}/save/${productId}`;
    this.httpClient.post<any>(url, review).subscribe();
  }

  getProductReviews(productId: Number): Observable<any> {
    const url = `${this.reviewsUrl}/product/${productId}`;
    return this.httpClient.get<any>(url);
  }

  saveImage(image: any, id: number): Observable<any> {
    const url = `${this.imageUrl}/${id}`;
    return this.httpClient.post(url, image);
  }

  getProductImage(productImageName: string): Observable<any> {
    const url = `http://localhost:8081/api/images/download?name=${productImageName}`;
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'image/jpeg',
      }),
      responseType: 'blob', // This tells angular to parse it as a blob, default is json
    };
    return this.httpClient.get<any>(url, httpOptions as any);
  }

  getAllReviews(): Observable<any> {
    const url = 'http://localhost:8081/api/reviews';
    return this.httpClient.get<any>(url);
  }

  sendForm(formData: any, categoryId: number) {
    return this.httpClient.post<any>(
      `${this.productCategoryUrl}/${categoryId}`,
      formData
    );
  }

  adminIsOnAdminPage() {
    this.checkIfAdminIsOnAdminPage.next(true);
  }

  adminLeftAdminPage() {
    this.checkIfAdminIsOnAdminPage.next(false);
  }

  getCurrentBasket(): Observable<OrderItem[]> {
    const url = 'http://localhost:8081/api/orders/me/basket';
    return this.httpClient.get<OrderItem[]>(url);
  }

  getDiscountedProducts(): Observable<Product[]> {
    const url = 'http://localhost:8081/api/products/discount';
    return this.httpClient.get<Product[]>(url);
  }
  getMostSelledProducts(): Observable<Product[]> {
    const url = 'http://localhost:8081/api/products/placed';
    return this.httpClient.get<Product[]>(url);
  }

  getFavoriteProducts(): Observable<Product[]> {
    const url = 'http://localhost:8081/api/products/fav';
    return this.httpClient.get<Product[]>(url);
  }

  addFavoriteProduct(productId: number): Observable<string> {
    const url = `http://localhost:8081/api/products/fav?productId=${productId}`;
    return this.httpClient.post<string>(url, { responseType: 'text' });
  }

  deleteFavoriteProduct(productId: number) {
    const url = `http://localhost:8081/api/products/fav?productId=${productId}`;
    return this.httpClient.delete<any>(url, {});
  }
}
