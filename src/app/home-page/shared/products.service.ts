import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Category } from './category.model';
import { OrderItem } from './orderItem.model';
import { Review } from './review.model';
import { BASE_URL_API, BASE_URL } from '../../settings';
import { Order } from './order.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

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

  public shoppingCartObservable = new BehaviorSubject<{
    basketOrderItems?: OrderItem[];
  }>({ basketOrderItems: [] });

  public currentBasketItems: OrderItem[] = [];

  public searchUrl = `${BASE_URL_API}/products/search`;

  getSearchedProducts(name: string): Observable<any> {
    const url = `${this.searchUrl}?name=${name}&pageNumber=0`;
    return this.httpClient.get<any>(url);
  }

  getShopingCartObservable(): Observable<{
    basketOrderItems?: OrderItem[];
  }> {
    return this.shoppingCartObservable.asObservable();
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

  getProduct(id: number): Observable<any | undefined> {
    const url = `${this.productsUrl}/${id}`;
    return this.httpClient.get(url);
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

    return this.httpClient.post<OrderItem>(addProductToOrderUrl, {}).pipe(
      tap((res) => {
        this.currentBasketItems.push(res);
        this.shoppingCartObservable.next({
          basketOrderItems: this.currentBasketItems,
        });
      })
    );
  }

  saveReview(productId: number, review: Review) {
    const url = `${this.reviewsUrl}/save/${productId}`;
    this.httpClient.post<any>(url, review).subscribe();
  }

  getProductReviews(productId: Number): Observable<any> {
    const url = `${this.reviewsUrl}/product/${productId}`;
    return this.httpClient.get<any>(url);
  }

  getAllReviews(): Observable<any> {
    const url = `${BASE_URL_API}/reviews`;
    return this.httpClient.get<any>(url);
  }

  sendForm(formData: any, categoryId: number) {
    return this.httpClient.post<any>(
      `${this.productCategoryUrl}/${categoryId}`,
      formData
    );
  }

  getCurrentBasket(): Observable<OrderItem[]> {
    const url = `${BASE_URL_API}/orders/me/basket`;
    return this.httpClient.get<OrderItem[]>(url).pipe(
      tap((res) => {
        this.currentBasketItems = res;
        this.shoppingCartObservable.next({
          basketOrderItems: res,
        });
      })
    );
  }

  deleteOrderItem(orderId: number) {
    const url = `${BASE_URL_API}/orderItems/${orderId}`;
    return this.httpClient.delete(url, { responseType: 'text' }).pipe(
      tap(() => {
        this.currentBasketItems = this.currentBasketItems.filter(
          (item) => item.id !== orderId
        );
        this.shoppingCartObservable.next({
          basketOrderItems: this.currentBasketItems,
        });
      })
    );
  }

  getDiscountedProducts(): Observable<Product[]> {
    const url = `${BASE_URL_API}/products/discount`;
    return this.httpClient.get<Product[]>(url);
  }
  getMostSelledProducts(): Observable<Product[]> {
    const url = `${BASE_URL_API}/products/placed`;
    return this.httpClient.get<Product[]>(url);
  }

  updateOrderQuantity(orderId: number, quantity: number) {
    const url = `${BASE_URL_API}/orderItems/${orderId}/quantity?quantity=${quantity}`;
    return this.httpClient.put(url, {}, { responseType: 'text' }).pipe(
      tap(() => {
        this.currentBasketItems = this.currentBasketItems.map((item) => {
          if (item.id === orderId) {
            item.quantity = quantity;
          }
          return item;
        });
        this.shoppingCartObservable.next({
          basketOrderItems: this.currentBasketItems,
        });
      })
    );
  }

  addToCart(product: Product, basketItems: OrderItem[]): Observable<any> {
    let orderItem = basketItems.filter(
      (item: OrderItem) => item.productId === product.id
    );
    if (orderItem.length) {
      if (product.unitsInStock >= orderItem[0].quantity + 1) {
        return this.updateOrderQuantity(
          orderItem[0].id,
          orderItem[0].quantity + 1
        );
        // .subscribe();
      } else {
        console.log('quantity exceeds stock');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Quantity exceeds stock',
        });
      }
    } else {
      return this.addProductToOrder(product.id, 1);
      // .subscribe();
    }
    return EMPTY;
  }

  getProductImage(productImage: string) {
    return `${BASE_URL_API}/images/download?name=${productImage}`;
  }
  deleteImage(name: any) {
    const url = `${this.deleteImageUrl}?name=${name}`;
    return this.httpClient.delete(url);
  }

  saveImage(image: any, id: number): Observable<any> {
    const url = `${this.imageUrl}/${id}`;
    return this.httpClient.post(url, image);
  }
}
