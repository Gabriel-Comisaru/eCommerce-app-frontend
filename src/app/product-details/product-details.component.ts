import { Component, OnInit } from '@angular/core';
import { MockProductDetailed } from '../home-page/shared/mockProduct.model';
import { MockProductsService } from '../home-page/shared/mock-products.service';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../shopping-cart/shared/basket.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

interface Review {
  rating: number,
  title: string,
  comment: string
}
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: MockProductDetailed = {} as MockProductDetailed;
  images: { url: string }[] = [];
  position: string = 'bottom';
  reviewsValue: number = 5;
  // addReviewValue: number = 0;
  discountedPrice: number = 0;
  reviews: Review[] = [];

  reviewForm = this.fb.group({
    rating: new FormControl(0, {nonNullable: true}),
    title: new FormControl('', {nonNullable: true}),
    comment: new FormControl('', {nonNullable: true})
  })

  constructor(private productService: MockProductsService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.productService.getProduct(id).subscribe((product) => {
      let rating = Math.round(product.rating);
      let discountedPrice = Math.round(
        product.price - product.price * (product.discountPercentage / 100)
      );
      this.product = {
        id: product.id,
        name: product.title,
        photos: product.images,
        price: product.price,
        rating: rating,
        reviews: ['No reviews available'],
        discount: discountedPrice,
        category: product.category,
        description: product.description,
        stock: product.stock,
      } as MockProductDetailed;
      this.getImages();
    });
  }

  scrollToSection(id: string) {
    const section = document.getElementById(id)!;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  getImages() {
    for (let photo of this.product.photos) {
      this.images.push({ url: photo });
    }
    this.images = [...this.images];
  }

  addToBasket(product: MockProductDetailed): void {
    this.basketService.addToBasket(product);
  }

  onSubmit() {
    const review: Review = 
    {
      rating: this.reviewForm.controls.rating.value,
      title: this.reviewForm.controls.title.value,
      comment: this.reviewForm.controls.comment.value,
    }
    this.reviews.push(review)
    console.log(this.reviews);
    
  }
}
