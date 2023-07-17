import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../home-page/shared/product.model';
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../product-categories/shared/categories.service";
import {ProductsService} from '../home-page/shared/products.service';
import {Review} from "../home-page/shared/review.model";

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {
  @Input () selectedCategory!: any;
  public mockProducts: Product[] = [];
  public categories: any[] = [];
  public placeholder: any = [];
  overallRating: any = 0;
  public lalalala: any[] = [];
  public categoryNames: Map<number,string> = new Map<number, string>()
  reviews: Review[] = [];

  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private categoryService: CategoriesService
              ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((list) => {
      this.lalalala = list.map((item: any) => {
        console.log(item, 'this is the item');
        return {
          ...item,
          rating: 0 // Assign initial value for the 'rating' property
        };
      });

      // Retrieve reviews for each item and update the rating
      this.lalalala.forEach((item: any) => {
        this.productService.getProductReviews(item.id).subscribe((reviews) => {
          console.log(reviews, 'this is the reviews');
          item.reviews = reviews;
          item.rating = this.calculateRating(item.reviews); // Update the 'rating' property
        });
      });
    });

    console.log(this.route.snapshot.params);
    console.log(this.route.snapshot.params['category']);
  }

  applyFilters(selectedCategory: any) {
    this.selectedCategory = selectedCategory;
    console.log(this.selectedCategory, 'this is the selected category')
    console.log(typeof selectedCategory, 'this is the type of selected category')
    if (typeof this.selectedCategory === 'string') {
      console.log(this.placeholder, 'this is the placeholder')
      console.log(this.lalalala, 'this is the list before filtering')
      this.lalalala = this.placeholder.filter((product: Product) => product.categoryId == this.selectedCategory);
      console.log(this.lalalala, 'filtering by number')
    }else if (typeof this.selectedCategory === 'object'){
      this.lalalala = this.placeholder.filter((product: Product) => product.categoryId === this.selectedCategory.categoryId);
      console.log(this.lalalala, 'filtering by object')
    }
    else {
      console.log('No selected category');
    }
  }
  calculateRating(reviews: Review[]): number {
    let totalRating = 0;
    for (let review of reviews) {
      totalRating += review.rating;
    }
    return Math.round(totalRating / reviews.length);
  }


  clearFilters(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    console.log('Selected Category:', this.selectedCategory.categoryId);
      this.lalalala = this.placeholder;
      console.log(this.lalalala);
      console.log('No selected category');
  }
}
