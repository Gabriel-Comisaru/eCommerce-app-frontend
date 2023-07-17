import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../home-page/shared/product.model';
import {ActivatedRoute, Router} from "@angular/router";
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
  public filteredList: any[] = [];
  public totalRows: number = 0;

  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private router: Router
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
      this.filteredList.forEach((item: any) => {
        this.productService.getProductReviews(item.id).subscribe((reviews) => {
          item.reviews = reviews;
          item.rating = this.calculateRating(item.reviews);
          this.placeholder = this.filteredList;
          this.loading = false;
          this.totalRows = this.filteredList.length;
          if(this.route.snapshot.queryParams['categoryId']) {
            console.log('am filtrat prin parametruuuuu', this.filteredList)
            const categoryId = this.route.snapshot.queryParams['categoryId'];
            this.filteredList = this.placeholder.filter((product: Product) => product.categoryId == categoryId);
          }
        });
      });
    });
  }


  applyFilters(filters: any): void {
    console.log(filters);
    const selectedCategoryId = filters.categoryId
    console.log(selectedCategoryId);
    const priceMin = filters.priceMin;
    const priceMax = filters.priceMax;

    if (selectedCategoryId) {
      console.log(this.filteredList)

      this.filteredList = this.placeholder.filter((product: Product) => product.categoryId == selectedCategoryId);
      console.log('am filtrat prin parametru')
    } else {
      this.filteredList = this.placeholder;
    }

    if (priceMin && priceMax) {
      console.log('am filtrat prin pret')
      this.filteredList = this.filteredList.filter((product: Product) => {
        const price = product.price;
        return price >= priceMin && price <= priceMax;
      });
    }

    this.totalRows = this.filteredList.length;
  }

  calculateRating(reviews: Review[]): number {
    let totalRating = 0;
    for (let review of reviews) {
      totalRating += review.rating;
    }
    return Math.round(totalRating / reviews.length);
  }


  clearFilters(): void {
    this.selectedCategory = null;
    this.filteredList = this.placeholder;
    this.totalRows = this.filteredList.length;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: null
    });
  }
}
