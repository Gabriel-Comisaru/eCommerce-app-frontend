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
  loading: boolean = true;
  public mockProducts: Product[] = [];
  public categories: any[] = [];
  public placeholder: any = [];
  overallRating: any = 0;
  public filteredList: any[] = [];
  public totalRows: number = 0;

  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private categoryService: CategoriesService
              ) {}

  ngOnInit(): void {
   this.loading = true;
   this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((list) => {
      this.filteredList = list.map((item: any) => {
        const url = `http://localhost:8081/api/images/download?name=${item.imagesName[0]}`;
        return {
          ...item,
          rating: 0,
          productImage: url,

        };
      });
      // Retrieve reviews for each item and update the rating
      this.filteredList.forEach((item: any) => {
        this.productService.getProductReviews(item.id).subscribe((reviews) => {
          item.reviews = reviews;
          item.rating = this.calculateRating(item.reviews);
          this.placeholder = this.filteredList;
          this.loading = false;
          this.totalRows = this.filteredList.length;
        });
      });
    });

    if(this.route.snapshot) {
      this.applyFilters(this.route.snapshot.params)
    }
  }

  applyFilters(selectedCategory: any) {
    this.selectedCategory = selectedCategory;
    if (typeof this.selectedCategory === 'string') {
      this.filteredList = this.placeholder.filter((product: Product) => product.categoryId == this.selectedCategory);
    }else if (typeof this.selectedCategory === 'object'){
      this.filteredList = this.placeholder.filter((product: Product) => product.categoryId === this.selectedCategory.id);
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
    console.log('Selected Category:', this.selectedCategory.id);
      this.filteredList = this.placeholder;
      console.log(this.filteredList);
      console.log('No selected category');
  }
}
