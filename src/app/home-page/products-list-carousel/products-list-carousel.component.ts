import { Component, Input, SimpleChanges } from '@angular/core';
import { MockProductDetailed } from '../shared/mockProduct.model';
import { MockProductsService } from '../shared/mock-products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list-carousel',
  templateUrl: './products-list-carousel.component.html',
  styleUrls: ['./products-list-carousel.component.css'],
})
export class ProductsListCarouselComponent {
  constructor(
    private mockProductsService: MockProductsService,
    private router: Router
  ) {}
  @Input() productsToDisplay!: MockProductDetailed[];
  @Input() mockProductsList!: MockProductDetailed[];
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
  addToCart(product: MockProductDetailed) {
    const shoppingCartList: MockProductDetailed[] = JSON.parse(
      localStorage.getItem('shoppingCart') || '[]'
    );
    if (shoppingCartList.some((element) => element.id === product.id)) {
      //TODO change quantity
    } else shoppingCartList.push(product);

    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartList));
    this.mockProductsService.shoppingCartObservable.next(shoppingCartList);

    // if product already exists don't add it
  }
  addToFavorite(product: MockProductDetailed) {
    const favoriteProductsList: MockProductDetailed[] = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );
    if (favoriteProductsList.some((element) => element.id === product.id)) {
      //TODO change quantity
    } else favoriteProductsList.push(product);

    localStorage.setItem(
      'favoriteProducts',
      JSON.stringify(favoriteProductsList)
    );
    this.mockProductsService.favoriteProductsObservable.next(
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
