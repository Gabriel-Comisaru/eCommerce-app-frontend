import { Component, OnInit } from '@angular/core';
import { Product } from '../home-page/shared/product.model';
import { ProductsService } from '../home-page/shared/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from '../shopping-cart/shared/basket.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Review } from '../home-page/shared/review.model';
import { AuthService } from '../services/auth.service';
import { FavoriteProductsServiceService } from '../home-page/shared/favorite-products-service.service';

import { BASE_URL_API } from '../settings';
import { OrderItem } from '../home-page/shared/orderItem.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {} as Product;
  images: String[] = [];
  position: string = 'bottom';
  discountedPrice: number = 0;
  reviews: Review[] = [];
  reviewForm = this.fb.nonNullable.group({
    rating: [0, [Validators.required]],
    title: ['', [Validators.required]],
    comment: ['', [Validators.required]],
  });
  favoriteItems: Product[] = [];
  basketItems: OrderItem[] = [];
  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private favoriteProductsService: FavoriteProductsServiceService
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.productService.getProduct(id).subscribe((product) => {
      this.product = product;
      console.log(product);
      this.product.category = product.categoryName;
      this.discountedPrice = Math.round(
        product.price - product.price * (product.discountPercentage / 100)
      );
      this.getImages();
    });

    this.productService.getProductReviews(id).subscribe((reviews) => {
      this.reviews = reviews;
    });
    this.favoriteProductsService.favoriteProductsObservable.subscribe((res) => {
      this.favoriteItems = res.favoriteProducts!;
    });
    this.productService.getShopingCartObservable().subscribe((res) => {
      this.basketItems = res.basketOrderItems!;
    });
  }

  scrollToSection(id: string) {
    const section = document.getElementById(id)!;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  getImages() {
    for (let image of this.product.imagesName) {
      this.images.push(`${BASE_URL_API}/images/download?name=${image}`);
    }
    this.images = [...this.images];
  }

  onSubmit() {
    if (this.authService.isAuthenticated()) {
      const review: Review = {
        rating: this.reviewForm.controls.rating.value,
        title: this.reviewForm.controls.title.value,
        comment: this.reviewForm.controls.comment.value,
      };

      this.productService.saveReview(this.product.id, review);
      this.reviews.push(review);
      this.reviewForm.reset();
    } else {
      this.router.navigate(['login']);
    }
  }

  addToFavorite(product: Product) {
    if (product.loadingFavorite) {
      return;
    }
    product.loadingFavorite = true;
    this.favoriteProductsService
      .addToFavorite(product, this.favoriteItems)
      .subscribe(() => (product.loadingFavorite = false));
  }

  addToCart(product: Product) {
    if (product.loadingCart) {
      return;
    }
    product.loadingCart = true;
    this.productService
      .addToCart(product, this.basketItems)
      .subscribe(() => (product.loadingCart = false));
  }
  checkIfFavorite(product: Product) {
    return this.favoriteItems.some((el) => el.id === product.id);
  }
}
