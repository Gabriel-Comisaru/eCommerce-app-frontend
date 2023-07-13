import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { Product } from '../home-page/shared/product.model';
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../product-categories/shared/categories.service";
import { ProductsService } from '../home-page/shared/products.service';
import {observable, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent implements OnInit {
  @Input () selectedCategory!: any;
  public mockProducts: Product[] = [];
  public categories: any[] = [];
  public placeholder: any[] = [];
  public allProds: any = [];
  public lalalala: any[] = [];
  public categoryNames: Map<number,string> = new Map<number, string>()


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
        that.lalalala = Array.from(list).map( (product: any) => {
          let placeholder = ''
          return {
            id: product.id,
            name: product.name,
            photos: product.images,
            price: product.price,
            reviews: ['Nothing yet'],
            rating: product.rating,
            discount: product.discount,
            categoryId: product.categoryId,
            description: product.description,
            stock: product.stock,
            userId: product.userId

          };
        });
        console.log('Product ---', that.lalalala);

        that.placeholder = that.lalalala;
        if (this.route.snapshot.params['category']) {
          this.applyFilters(this.route.snapshot.params['category']);
          this.selectedCategory = this.route.snapshot.params['category'];
        }
      });

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

  clearFilters(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    console.log('Selected Category:', this.selectedCategory.categoryId);
      this.lalalala = this.placeholder;
      console.log(this.lalalala);
      console.log('No selected category');
  }
}
