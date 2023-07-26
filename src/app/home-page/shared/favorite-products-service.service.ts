import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL_API } from 'src/app/settings';
@Injectable({
  providedIn: 'root',
})
export class FavoriteProductsServiceService {
  public favoriteProductsObservable = new BehaviorSubject<{
    favoriteProducts?: Product[];
  }>({ favoriteProducts: [] });

  public currentFavoriteItems: Product[] = [];
  constructor(private httpClient: HttpClient) {}

  // get favorite products of the logged user
  getFavoriteProducts(): Observable<Product[]> {
    const url = `${BASE_URL_API}/products/fav`;
    return this.httpClient.get<Product[]>(url).pipe(
      tap((res) => {
        this.currentFavoriteItems = res;
        this.favoriteProductsObservable.next({
          favoriteProducts: this.currentFavoriteItems,
        });
      })
    );
  }

  addFavoriteProduct(product: Product): Observable<string> {
    const url = `${BASE_URL_API}/products/fav?productId=${product.id}`;
    return this.httpClient.post<string>(url, { responseType: 'text' }).pipe(
      tap(() => {
        this.currentFavoriteItems.push(product);
        this.favoriteProductsObservable.next({
          favoriteProducts: this.currentFavoriteItems,
        });
      })
    );
  }

  deleteFavoriteProduct(productId: number) {
    const url = `${BASE_URL_API}/products/fav?productId=${productId}`;
    return this.httpClient.delete<any>(url, {}).pipe(
      tap(() => {
        this.currentFavoriteItems = this.currentFavoriteItems.filter(
          (item) => productId !== item.id
        );
        this.favoriteProductsObservable.next({
          favoriteProducts: this.currentFavoriteItems,
        });
      })
    );
  }
  addToFavorite(product: Product, favoriteList: Product[]) {
    if (favoriteList.some((el) => el.id === product.id)) {
      // if product already exists the favorite list delete it
      this.deleteFavoriteProduct(product.id).subscribe();
    } else {
      this.addFavoriteProduct(product).subscribe();
    }
  }
}
