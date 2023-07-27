import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../home-page/shared/product.model';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from '../home-page/shared/products.service';
import { BASE_URL_API } from '../settings';

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
   setTimeout(() => {
      this.loadProducts();
   }, 100)
   // this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getProducts().subscribe((list) => {
      this.filteredList = list.map((item: any) => {
          const url = item.imagesName.length > 0? `${BASE_URL_API}/images/download?name=${item.imagesName[0]}` : '';
        return {
          ...item,
          productImage: url,
        };
      });

      this.totalRows = this.filteredList.length;


      this.placeholder = this.filteredList;
      this.loading = false;
    });
  }


  applyFilters(filters: any): void {
    const selectedCategoryId = filters.categoryId
    const priceMin = filters.priceMin;
    const priceMax = filters.priceMax;

    if (selectedCategoryId) {
      this.filteredList = this.placeholder.filter((product: Product) => product.categoryId == selectedCategoryId);
    } else {
      this.filteredList = this.placeholder;
    }

    if (priceMin>-1 && priceMax) {
      this.filteredList = this.filteredList.filter((product: Product) => {
        const price = product.price;
        return price >= priceMin && price <= priceMax;
      });
    }
    this.totalRows = this.filteredList.length;
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
