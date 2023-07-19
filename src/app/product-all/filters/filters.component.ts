// import {Component, EventEmitter, OnInit, Output} from '@angular/core';
// import {CategoriesService} from "../../product-categories/shared/categories.service";
// import {ActivatedRoute} from "@angular/router";
//
// @Component({
//   selector: 'app-filters',
//   templateUrl: './filters.component.html',
//   styleUrls: ['./filters.component.css']
// })
// export class FiltersComponent implements OnInit {
//   // @Input() categories!: string[];
//   @Output() filtersApplied: EventEmitter<any> = new EventEmitter<any>();
//   @Output() filtersCleared: EventEmitter<any> = new EventEmitter<any>();
//   public categories: any[] = [];
//   selectedCategory!: any;
//   selectedPriceRange!: [number, number];
//
//
//   constructor(private categoryService: CategoriesService,
//               private route: ActivatedRoute
//               ) { }
//
//
//   ngOnInit(): void {
//       this.loadData()
//     this.applyFilters()
//   }
//   loadData(): void {
//     this.selectedPriceRange = [0, 1000];
//     this.categoryService.getCategories().subscribe((list) => {
//       this.categories = list;
//       const categoryIdParam = this.route.snapshot.params['category'];
//       console.log(categoryIdParam, '----p-a-r-a-m---------------')
//       if (categoryIdParam) {
//         this.selectedCategory = this.categories.find((category: any) => category.id == categoryIdParam);
//         console.log(this.selectedCategory, '-----------------1---1--1-')
//       }
//     });
//     console.log(this.selectedCategory)
//   }
//
//   onCategoryChange(category: any) {
//     this.selectedCategory = category;
//     console.log(this.selectedCategory)
//   }
//
//
//   applyFilters(): void {
//     const selectedCategoryId = this.selectedCategory ? this.selectedCategory.id : '';
//     console.log(this.selectedCategory, '------====-----------------------')
//     const selectedPriceMin = this.selectedPriceRange[0];
//     const selectedPriceMax = this.selectedPriceRange[1];
//
//     // Emit the filter values
//     this.filtersApplied.emit({
//       categoryId: selectedCategoryId,
//       priceMin: selectedPriceMin,
//       priceMax: selectedPriceMax
//     });
//   }
//   clearFilters(): void {
//     this.selectedCategory = '';
//     this.selectedPriceRange = [0, 1000];
//     this.filtersCleared.emit({selectedCategory: this.selectedCategory,
//       selectedPriceRange: this.selectedPriceRange});
//   }
//
//
// }
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from "../../product-categories/shared/categories.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Categories} from "../shared/categories.model";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() filtersApplied: EventEmitter<any> = new EventEmitter<any>();
  @Output() filtersCleared: EventEmitter<any> = new EventEmitter<any>();
  public categories: Categories[] = [];
  // public selectedCategory: number;
  selectedPriceRange!: [number, number];
  public selectedCategory: any

  constructor(private categoryService: CategoriesService, private route: ActivatedRoute,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.selectedPriceRange = [0, 1000];
    this.loadData();
  }

  loadData(): void {
    this.categoryService.getCategories().subscribe((list) => {
      this.categories = list;
      const categoryIdParam = this.route.snapshot.queryParams;
      if (categoryIdParam) {
        this.selectedCategory = this.categories.find((category: any) => category.id == categoryIdParam['categoryId']);
        this.filtersApplied.emit({
          categoryId: this.selectedCategory.id,
          priceMin: 0,
          priceMax: 1000
        });
      }
    });
    console.log(this.selectedCategory)
  }
  onCategoryChange(category: any): void {
    this.selectedCategory = category;
  }

  applyFilters(): void {
    const selectedCategoryId = this.selectedCategory ? this.selectedCategory.id : '';
    const selectedPriceMin = this.selectedPriceRange[0];
    const selectedPriceMax = this.selectedPriceRange[1];

    this.filtersApplied.emit({
      categoryId: selectedCategoryId,
      priceMin: selectedPriceMin,
      priceMax: selectedPriceMax
    });
    // Update the query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: selectedCategoryId,
        priceMin: selectedPriceMin,
        priceMax: selectedPriceMax
      },
      queryParamsHandling: 'merge'
    });
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.selectedPriceRange = [0, 1000];
    this.filtersCleared.emit({
      selectedCategory: '',
      priceMin: 0,
      priceMax: 1000
    });
  }
}
