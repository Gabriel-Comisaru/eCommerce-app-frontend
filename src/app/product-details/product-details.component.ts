import { Component, OnInit } from '@angular/core';
import { Product } from '../home-page/shared/product.model';
import { ProductsService } from '../home-page/shared/products.service';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../shopping-cart/shared/basket.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Review } from '../home-page/shared/review.model';
import { AuthService } from '../helpers/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {} as Product;
  images: { url: string }[] = [];
  position: string = 'bottom';
  overallRating: number = 0;
  discountedPrice: number = 0;
  reviews: Review[] = [];
  reviewForm = this.fb.group({
    rating: new FormControl(0, {nonNullable: true}),
    title: new FormControl('', {nonNullable: true}),
    comment: new FormControl('', {nonNullable: true})
  })
  
  constructor(private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.productService.getProduct(id).subscribe((product) => {
      this.product = product;
      this.discountedPrice = Math.round(
        product.price - product.price * (product.discountPercentage / 100)
      );
      product.rating = this.overallRating;
      // this.getImages();
    });
    this.productService.getProductReviews(id)
      .subscribe(reviews => {
        this.reviews = reviews
        this.calculateRating();
      });
  }

  scrollToSection(id: string) {
    const section = document.getElementById(id)!;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  // getImages() {
  //   for (let photo of this.product.images) {
  //     this.images.push({ url: photo });
  //   }
  //   this.images = [...this.images];
  // }

  // addToBasket(product: Product): void {
  //   this.basketService.addToBasket(product);
  // }

  onSubmit() {
    const review: Review = 
    {
      rating: this.reviewForm.controls.rating.value,
      title: this.reviewForm.controls.title.value,
      comment: this.reviewForm.controls.comment.value
    }
    
    this.productService.saveReview(this.product.id, review);
    this.reviews.push(review);
    this.reviewForm.reset();
  }

  addToFavorite(product: Product) {
    const favoriteProductsList: Product[] = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );
    if (favoriteProductsList.some((element) => element.id === product.id)) {

    } else favoriteProductsList.push(product);

    localStorage.setItem(
      'favoriteProducts',
      JSON.stringify(favoriteProductsList)
    );
    this.productService.favoriteProductsObservable.next(
      favoriteProductsList
    );
  }

  calculateRating() {
    let totalRating = 0;
    for (let review of this.reviews) {
      totalRating += review.rating
    }
    console.log(totalRating);
    console.log(this.reviews.length);
    this.overallRating = Math.round(totalRating / this.reviews.length);
    console.log(this.overallRating);
    return this.overallRating;
  }
  
}
