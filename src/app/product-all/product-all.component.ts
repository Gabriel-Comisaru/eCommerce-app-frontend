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
    // if (this.route.snapshot.params['category']) {
    //   this.allProds = this.productService.getProductsByCat(this.route.snapshot.params['category']).subscribe()
    //   this.lalalala, this.placeholder = this.allProds
    //
    // } else {
    //   this.allProds = this.productService.getProducts().subscribe()
    //   this.lalalala, this.placeholder = this.allProds
    // }


    let that = this;

      that.productService.getProducts().subscribe((list) => {
        that.lalalala = list.map((item: any) => {

        });
      });

      this.lalalala.forEach((item: any) => {
        this.productService.getProductReviews(item.id).subscribe((reviews) => {
          item.reviews = reviews;
          this.calculateRating();
        })
      })

    console.log(this.route.snapshot.params)
    console.log(this.route.snapshot.params['category'])



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
  calculateRating() {
    let totalRating = 0;
    for (let review of this.reviews) {
      totalRating += review.rating
    }
    return Math.round(totalRating / this.reviews.length);
  }

  clearFilters(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    console.log('Selected Category:', this.selectedCategory.categoryId);
      this.lalalala = this.placeholder;
      console.log(this.lalalala);
      console.log('No selected category');
  }
}
