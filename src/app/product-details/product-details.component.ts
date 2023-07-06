import { Component, OnInit } from '@angular/core';
import { Product } from '../home-page/shared/product.model';
import { ProductsService } from '../home-page/shared/products.service';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../shopping-cart/shared/basket.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Review } from '../home-page/shared/review.model';
import { AuthService } from '../helpers/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {} as Product;
  images: { url: string }[] = [];
  position: string = 'bottom';
  reviewsValue: number = 5;
  // addReviewValue: number = 0;
  discountedPrice: number = 0;
  reviews: Review[] = [];
  // token: string = '';

  reviewForm = this.fb.group({
    rating: new FormControl(0, {nonNullable: true}),
    title: new FormControl('', {nonNullable: true}),
    comment: new FormControl('', {nonNullable: true})
  })
  authorization: string = '';

  constructor(private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.productService.getProduct(id).subscribe((product) => {
      // for(let review of this.reviews) {

      // }
      product.rating = Math.round(product.rating);
      this.discountedPrice = Math.round(
        product.price - product.price * (product.discountPercentage / 100)
      );
      // this.product = {
      //   id: product.id,
      //   name: product.title,
      //   photos: product.images,
      //   price: product.price,
      //   rating: rating,
      //   reviews: ['No reviews available'],
      //   discount: discountedPrice,
      //   category: product.category,
      //   description: product.description,
      //   stock: product.stock,
      // } as Product;
      product.rating = this.reviewsValue;
      this.product = product;
      this.reviews = product.reviews;
      this.authService.login('laur', 'laur').subscribe(res => {
        // this.token = res.token;
        this.authorization = `Bearer ${res.token}`;
        // this.authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYXVyIiwiaWF0IjoxNjg4NjIxNjgxLCJleHAiOjE2ODg2Mzk2ODF9.aH_WKQEJbucLpn9q_mFpBKUasi_VBTcI5JK_d04Eomw';
        // console.log(this.token);
        
      })
      // this.getImages();
    });
  }

  scrollToSection(id: string) {
    const section = document.getElementById(id)!;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  getImages() {
    for (let photo of this.product.images) {
      this.images.push({ url: photo });
    }
    this.images = [...this.images];
  }

  // addToBasket(product: Product): void {
  //   this.basketService.addToBasket(product);
  // }

  onSubmit() {
    const review: Review = 
    {
      rating: this.reviewForm.controls.rating.value,
      title: this.reviewForm.controls.title.value,
      comment: this.reviewForm.controls.comment.value,
      date: new Date()
    }
    let header = new HttpHeaders(
      {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': this.authorization 
      }
    );
    let options = { headers: header };
    
    this.productService.saveReview(this.product.id, review, options);
    // this.product.reviews.push(review) 
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

  
}
