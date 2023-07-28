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
    setTimeout(() => {
      this.loadData();

    }, 500)
    // this.loadData();
  }

  loadData(): void {
    this.categoryService.getCategories().subscribe((list) => {
      this.categories = list;
      const categoryIdParam = this.route.snapshot.queryParams;
      if (categoryIdParam) {
        this.selectedCategory = this.categories.find((category: any) => category.id == categoryIdParam['categoryId']);
        this.filtersApplied.emit({
          categoryId: this.selectedCategory != undefined ? this.route.snapshot.queryParams['categoryId'] : '',
          priceMin: 0,
          priceMax: 1000
        });
      }
    });
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
