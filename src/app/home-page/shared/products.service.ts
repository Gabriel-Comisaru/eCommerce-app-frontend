import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
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
  private categoriesUrl = 'http://localhost:8081/api/categories';
  private reviewsUrl = 'http://localhost:8081/api/reviews';
  private productCategoryUrl = 'http://localhost:8081/api/products/category';
  private imageUrl = 'http://localhost:8081/api/images/upload';

  private orderItemsUrl = 'http://localhost:8081/api/orderItems';
  // public shoppingCartObservable = new Subject<Product[]>();
  public shoppingCartObservable = new Subject<OrderItem>();
  public favoriteProductsObservable = new Subject<Product[]>();

  getShopingCartObservable(): Observable<any> {
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
  getOrders(): Observable<any> {
    return this.httpClient.get<any>(this.orderItemsUrl);
  }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(this.productsUrl);
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

  delete(id: number) {
    const url = `${this.productsUrl}/${id}`;
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
    const addProductToOrderUrl = `http://localhost:8081/api/orderItems/${productId}?quantity=${quantity}`;
    const productBody = {
      quantity,
    };
    return this.httpClient.post<OrderItem>(addProductToOrderUrl, productBody);
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
}
