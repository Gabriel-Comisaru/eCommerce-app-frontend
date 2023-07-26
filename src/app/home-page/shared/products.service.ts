import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Category } from './category.model';
import { OrderItem } from './orderItem.model';
import { Review } from './review.model';
import { BASE_URL_API } from '../../settings';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  private productsUrl = `${BASE_URL_API}/products`;
  private productsUrlDisplay = `${BASE_URL_API}/products/display`;
  private categoriesUrl = 'http://localhost:8081/api/categories';
  private reviewsUrl = 'http://localhost:8081/api/reviews';
  private productCategoryUrl = 'http://localhost:8081/api/products/category';
  private ordersUrl = 'http://localhost:8081/api/orders';
  private orderItemsUrl = 'http://localhost:8081/api/orderItems';
  public shoppingCartObservable = new BehaviorSubject<{
    basketOrderItems?: OrderItem[];
  }>({ basketOrderItems: [] });

  public favoriteProductsObservable = new Subject<{
    favoriteProduct?: Product;
    productAction: string;
    allFavoriteItems?: Product[];
  }>();
  public currentBasketItems: OrderItem[] = [];

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
    const addProductToOrderUrl = `http://localhost:8081/api/orders/${productId}?quantity=${quantity}`;

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
    const url = 'http://localhost:8081/api/reviews';
    return this.httpClient.get<any>(url);
  }

  sendForm(formData: any, categoryId: number) {
    return this.httpClient
      .post<any>(`${this.productCategoryUrl}/${categoryId}`, formData);
  }

  getCurrentBasket(): Observable<OrderItem[]> {
    const url = 'http://localhost:8081/api/orders/me/basket';
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
    const url = `http://localhost:8081/api/orderItems/${orderId}`;
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

  updateOrderQuantity(orderId: number, quantity: number) {
    const url = `http://localhost:8081/api/orderItems/${orderId}/quantity?quantity=${quantity}`;
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

  addToFavorite(product: Product) {
    if (product.favUserIds.includes(product.userId)) {
      // if product already exists the favorite list delete it
      this.deleteFavoriteProduct(product.id)
        .subscribe(() => {
          this.favoriteProductsObservable.next({
            productAction: 'delete',
            favoriteProduct: product,
          });
          product.favUserIds = product.favUserIds.filter(
            (id) => id !== product.userId
          );
        });
    } else {
      this.addFavoriteProduct(product.id).subscribe(() => {
        this.favoriteProductsObservable.next({
          productAction: 'add',
          favoriteProduct: product,
        });

        product.favUserIds.push(product.userId);
      });
    }
  }

  addToCart(product: Product, basketItems: OrderItem[] = []) {
    let orderItem = basketItems.filter(
      (item: OrderItem) => item.productId === product.id
    );
    if (orderItem.length) {
      if (product.unitsInStock >= orderItem[0].quantity + 1) {
        this
          .updateOrderQuantity(orderItem[0].id, orderItem[0].quantity + 1)
          .subscribe();
      } else {
        console.log('quantity exceeds stock');
        //display somehow an error message
      }
    } else {
      this.addProductToOrder(product.id, 1).subscribe();
    }
  }

  getProductImage(productImage: string) {
    return `http://localhost:8081/api/images/download?name=${productImage}`;
  }
}
