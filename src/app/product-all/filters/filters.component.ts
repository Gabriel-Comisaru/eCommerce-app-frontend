import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SelectItem } from 'primeng/api';
import {CategoriesService} from "../../product-categories/shared/categories.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  // @Input() categories!: string[];
  @Output() filtersApplied: EventEmitter<string> = new EventEmitter<string>();
  @Output() filtersCleared: EventEmitter<string> = new EventEmitter<string>();
  public categories: { categoryName: string, categoryId : number}[] = [];
  selectedCategory!: string;
  selectedPriceRange!: [number, number];

  priceRangeOptions: any = {
    floor: 0,
    ceil: 1000,
    step: 10
  };

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.selectedCategory = '' ;
    this.selectedPriceRange = [0, 1000];
    this.categoryService.getCategories().subscribe((list) => {
      this.categories = list.map((category: any) => {
        return {
          categoryId: category.id,
          categoryName: category.name,
          // productNo: category.productIds.length
          // image: category.image
        };
      })
    })
  }

  applyFilters(): void {
    this.filtersApplied.emit(this.selectedCategory);
    console.log(this.categories)

  }
  clearFilters(): void {
    this.selectedCategory = '';
    this.filtersCleared.emit(this.selectedCategory);
  }


}
