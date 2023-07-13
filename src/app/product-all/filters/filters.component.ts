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
  public categories: { categoryName: string, categoryId : number}[] = [];
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
    console.log(this.categories)
  console.log(this.route.snapshot.params['category'])
    // if(this.route.snapshot.params['category'] !== undefined) {
    //   this.selectedCategory = this.route.snapshot.params['category'];
    //   this.applyFilters()
    // }
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
