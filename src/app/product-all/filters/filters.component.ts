import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SelectItem } from 'primeng/api';
import {CategoriesService} from "../../product-categories/shared/categories.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  // @Input() categories!: string[];
  @Output() filtersApplied: EventEmitter<string> = new EventEmitter<string>();
  @Output() filtersCleared: EventEmitter<string> = new EventEmitter<string>();
  public categories: any[] = [];
  selectedCategory!: string;
  selectedPriceRange!: [number, number];

  priceRangeOptions: any = {
    floor: 0,
    ceil: 1000,
    step: 10
  };

  constructor(private categoryService: CategoriesService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    // this.selectedCategory = this.route.snapshot.params['category'] || '' ;
    this.selectedPriceRange = [0, 1000];
    this.categoryService.getCategories().subscribe((list) => {
      this.categories = list;
      const categoryIdParam = this.route.snapshot.params['category'];
      console.log(this.route.snapshot.params['category'])
      if (categoryIdParam) {
        const selectedCategory = this.categories.find(category => category.categoryId === categoryIdParam);
        this.selectedCategory = selectedCategory ? selectedCategory.name : '';
        console.log(selectedCategory, this.selectedCategory);
      } else {
        this.selectedCategory = '';
        console.log(this.selectedCategory, 'asdadasdasdasdsa')
      }
    });

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
