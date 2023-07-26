import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from './product.model';
import { Category } from './category.model';
import { OrderItem } from './orderItem.model';
import { Review } from './review.model';
import { BASE_URL_API, BASE_URL } from '../../settings';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  private productsUrl = `${BASE_URL_API}/products`;
  private productsUrlDisplay = `${BASE_URL_API}/products/display`;
  private appUsersUrl = `${BASE_URL_API}/users`;
  private categoriesUrl = `${BASE_URL_API}/categories`;
  private reviewsUrl = `${BASE_URL_API}/reviews`;
  private productCategoryUrl = `${BASE_URL_API}/products/category`;
  private imageUrl = `${BASE_URL_API}/images/upload`;
  private deleteImageUrl = `${BASE_URL_API}/images/delete`;
  private ordersUrl = `${BASE_URL_API}/orders`;
  private orderItemsUrl = `${BASE_URL_API}/orderItems`;
  // public shoppingCartObservable = new Subject<Product[]>();
  public shoppingCartObservable = new Subject<{
    orderItem?: OrderItem;
    productAction: string;
    basketOrderItems?: OrderItem[];
  }>();
  public favoriteProductsObservable = new Subject<{
    favoriteProduct?: Product;
    productAction: string;
    allFavoriteItems?: Product[];
  }>();
  public searchUrl=`${BASE_URL_API}/products/search`

  getSearchedProducts(name:string): Observable<any>{
    const url =`${this.searchUrl}?name=${name}&pageNumber=0`
    return this.httpClient.get<any>(url);
  }

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

  getOrders(pageNumber: any, pageSize: any): Observable<any> {
    const url = `${this.ordersUrl}/display?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.httpClient.get<any>(url);
  }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.productsUrl);
  }

  getProductsDisplay(pageNumber: any, pageSize: any): Observable<any> {
    const url = `${this.productsUrlDisplay}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.httpClient.get<any>(url);
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
    const addProductToOrderUrl = `${BASE_URL_API}/orders/${productId}?quantity=${quantity}`;

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

  getAllReviews(): Observable<any> {
    const url = `${BASE_URL_API}/reviews`;
    return this.httpClient.get<any>(url);
  }

  sendForm(formData: any, categoryId: number) {
    return this.httpClient.post<any>(`${this.productCategoryUrl}/${categoryId}`,formData);

  }

  getCurrentBasket(): Observable<OrderItem[]> {
    const url = `${BASE_URL_API}/orders/me/basket`;
    return this.httpClient.get<OrderItem[]>(url);
  }

  getDiscountedProducts(): Observable<Product[]> {
    const url = `${BASE_URL_API}/products/discount`;
    return this.httpClient.get<Product[]>(url);
  }
  getMostSelledProducts(): Observable<Product[]> {
    const url = `${BASE_URL_API}/products/placed`;
    return this.httpClient.get<Product[]>(url);
  }

  deleteImage(name:any){
    const url = `${this.deleteImageUrl}?name=${name}`;
    return this.httpClient.delete(url)
  }

  getFavoriteProducts(): Observable<Product[]> {
    const url = `${BASE_URL_API}/products/fav`;
    return this.httpClient.get<Product[]>(url);
  }

  addFavoriteProduct(productId: number): Observable<string> {
    const url = `${BASE_URL_API}/products/fav?productId=${productId}`;
    return this.httpClient.post<string>(url, { responseType: 'text' });
  }

  deleteFavoriteProduct(productId: number) {
    const url = `${BASE_URL_API}/products/fav?productId=${productId}`;
    return this.httpClient.delete<any>(url, {});
  }
}
