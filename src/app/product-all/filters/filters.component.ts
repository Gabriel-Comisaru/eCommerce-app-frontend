import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() categories!: string[];
  @Output() filtersApplied: EventEmitter<string> = new EventEmitter<string>();
  @Output() filtersCleared: EventEmitter<string> = new EventEmitter<string>();

  selectedCategory!: string;
  selectedPriceRange!: [number, number];

  priceRangeOptions: any = {
    floor: 0,
    ceil: 1000,
    step: 10
  };

  constructor() { }

  ngOnInit(): void {
    this.selectedCategory = '';
    this.selectedPriceRange = [0, 1000];
  }

  applyFilters(): void {
    this.filtersApplied.emit(this.selectedCategory);

  }
  clearFilters(): void {
    this.selectedCategory = '';
    this.filtersCleared.emit(this.selectedCategory);
  }


}
