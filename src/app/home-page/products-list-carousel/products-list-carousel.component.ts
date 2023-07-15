import { Component, Input, SimpleChanges } from '@angular/core';
import { Product } from '../shared/product.model';

import { ProductsService } from '../shared/products.service';
import { Router } from '@angular/router';
import { OrderItem } from '../shared/orderItem.model';
import { FormGroup } from '@angular/forms';

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

  public dataLoaded: boolean = false;
  private orderItems: OrderItem[] = [];
  public productsToDisplayWithImages!: Product[];
  imageToShow!: any;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.productsToDisplay && this.productsToDisplay.length > 0) {
      this.dataLoadingStatus();
    }

    if (!changes['productsToDisplay'].firstChange) {
      // console.log(this.productsToDisplay);
      // this.productsToDisplay.forEach((product) => {
      // if (product.imagesName.length > 0) {
      // this.productsService
      //   .getProductImage(product.imagesName[0])
      //   .subscribe((response) =>
      //     this.createImageFromBlob(response, product.productImage)
      //   );

      this.productsToDisplayWithImages = this.productsToDisplay.map(
        (product) => {
          //TODO REFACTOR THE MAP
          if (product.imagesName.length > 0) {
            const url = `http://localhost:8081/api/images/download?name=${product.imagesName[0]}`;

            return {
              ...product,
              roundedRating: Math.floor(product.rating),
              productImage: url,
            };
          }
          return { ...product, roundedRating: Math.floor(product.rating) };
        }
      );
      // }
      // });
    }
  }

  // createImageFromBlob(image: Blob, store: any) {
  //   let reader = new FileReader();
  //   reader.addEventListener(
  //     'load',
  //     () => {
  //       store = reader.result;
  //     },
  //     false
  //   );
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }

  dataLoadingStatus() {
    this.dataLoaded = true;
  }
  addToCart(product: Product) {
    this.productsService.addProductToOrder(product.id, 1).subscribe((res) => {
      console.log(res);
    });

    //track shopping cart through local storage
    // const shoppingCartList: Product[] = JSON.parse(
    //   localStorage.getItem('shoppingCart') || '[]'
    // );
    // if (shoppingCartList.some((element) => element.id === product.id)) {
    //   //TODO change quantity
    // } else shoppingCartList.push(product);
    // localStorage.setItem('shoppingCart', JSON.stringify(shoppingCartList));
    // this.productsService.shoppingCartObservable.next(shoppingCartList);
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
    this.productsService.favoriteProductsObservable.next(favoriteProductsList);
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

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
  }
}
// <!-- notificare ca am adaugat in cos -->
// <!-- notificare ca am adaugat la favorite plus update badge-->
