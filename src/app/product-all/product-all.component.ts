import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../home-page/shared/product.model';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../product-categories/shared/categories.service';
import { ProductsService } from '../home-page/shared/products.service';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css'],
})
export class ProductAllComponent implements OnInit {
  @Input() selectedCategory!: any;
  public mockProducts: Product[] = [];
  public categories: any[] = [];
  public placeholder: any[] = [];
  public allprods: any[] = [];
  public lalalala: any[] = [];
  public categoryNames: Map<number, string> = new Map<number, string>();

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    let that = this;
    this.categoryService.getCategories().subscribe((list) => {
      this.categories = list.map((category: any) => {
        that.categoryNames.set(category.id, category.name);
      });
    });
    setTimeout(function () {
      that.productService.getProducts().subscribe((list) => {
        that.lalalala = list.map((product: any) => {
          let placeholder = '';
          that.categoryService
            .getCategoryById(product.categoryId)
            .subscribe((category) => {
              // debugger
              // setTimeout(function() {}, 1000);
              placeholder = category.name;
              // console.log(placeholder, 'placeholder...')
              // console.log(category.name, 'cat....name')
              return category.name;
            });

          // debugger

          return {
            id: product.id,
            name: product.name,
            photos: product.images,
            price: product.price,
            reviews: ['Nothing yet'],
            rating: product.rating,
            discount: product.discount,
            categoryId: product.categoryId,
            category: that.categoryNames.get(product.categoryId),
            description: product.description,
            stock: product.stock,
            userId: product.userId,
          };
        });
        console.log('Product ---', that.lalalala);

        that.placeholder = that.lalalala;
        that.allprods = that.lalalala;
      });
      if (that.route.snapshot.params['category']) {
        // this.applyFilters(this.route.snapshot.params['category']);
        // this.lalalala = this.placeholder.filter((product: Product) => product.categoryId === this.route.snapshot.params['category']);
        that.applyFilters2(that.route.snapshot.params['category']);
      }
    }, 100);
    // if(this.route.snapshot.params) {
    //   this.selectedCategory = this.route.snapshot.params['category'];
    //   console.log(this.route.snapshot.params['category'])
    //   this.applyFilters(this.route.snapshot.params['category'])
    // }
    console.log(this.route.snapshot.params);
    console.log(this.route.snapshot.params['category']);
  }
  applyFilters(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    console.log('Selected Category:', this.selectedCategory.categoryId);
    console.log('route param:', this.route.snapshot.params);
    console.log(
      'route param category:',
      this.route.snapshot.params['category']
    );
    if (this.selectedCategory) {
      this.lalalala = this.placeholder.filter(
        (product: Product) =>
          product.categoryId === this.selectedCategory.categoryId
      );
      console.log(this.lalalala);
    } else {
      console.log('No selected category');
    }
  }
  applyFilters2(selectedCategory: string) {
    let query = this.route.snapshot.params['category'];
    console.log(query, 'this is the query');
    this.lalalala = this.placeholder.filter(
      (product: Product) => product.categoryId === query
    );
  }
  clearFilters(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    console.log('Selected Category:', this.selectedCategory.categoryId);
    this.lalalala = this.placeholder;
    console.log(this.lalalala);
    console.log('No selected category');
  }
}

//
// import { Component, Input, OnInit } from '@angular/core';
// import { Product } from "./shared/mock-product.model";
// import { MockProductsService } from "./shared/mock-products.service";
// import { ActivatedRoute, Params } from "@angular/router";
// import { CategoriesService } from "../product-categories/shared/categories.service";
//
// @Component({
//   selector: 'app-product-all',
//   templateUrl: './product-all.component.html',
//   styleUrls: ['./product-all.component.css']
// })
// export class ProductAllComponent implements OnInit {
//   @Input() selectedCategory!: any;
//   public mockProducts: Product[] = [];
//   public categories: any[] = [];
//   public placeholder: any[] = [];
//   public lalalala: any[] = [];
//   public categoryNames: Map<number, string> = new Map<number, string>();
//
//   constructor(
//     private productService: MockProductsService,
//     private route: ActivatedRoute,
//     private categoryService: CategoriesService
//   ) {}
//
//   // ngOnInit(): void {
//   //   this.categoryService.getCategories().subscribe((list) => {
//   //     this.categories = list.map((category: any) => {
//   //       this.categoryNames.set(category.id, category.name);
//   //       return {
//   //         categoryId: category.id,
//   //         categoryName: category.name
//   //       };
//   //     });
//   //   });
//   //
//   //   this.productService.getProducts().subscribe((list) => {
//   //     this.lalalala = list.map((product: any) => {
//   //       const category = this.categoryNames.get(product.categoryId);
//   //       return {
//   //         id: product.id,
//   //         name: product.name,
//   //         photos: product.images,
//   //         price: product.price,
//   //         reviews: ['Nothing yet'],
//   //         rating: product.rating,
//   //         discount: product.discount,
//   //         categoryId: product.categoryId,
//   //         category: category,
//   //         description: product.description,
//   //         stock: product.stock,
//   //         userId: product.userId
//   //       };
//   //     });
//   //
//   //     this.placeholder = this.lalalala;
//   //
//   //     this.route.queryParams.subscribe((params: Params) => {
//   //       const categoryId = params['category'];
//   //       this.applyFilters(categoryId);
//   //     });
//   //   });
//   // }
//   ngOnInit(): void {
//     this.categoryService.getCategories().subscribe((list) => {
//       this.categories = list.map((category: any) => {
//         this.categoryNames.set(category.id, category.name);
//         return {
//           categoryId: category.id,
//           categoryName: category.name
//         };
//       });
//     });
//
//     this.productService.getProducts().subscribe((list) => {
//       this.lalalala = list.map((product: any) => {
//         const category = this.categoryNames.get(product.categoryId);
//         return {
//           id: product.id,
//           name: product.name,
//           photos: product.images,
//           price: product.price,
//           reviews: ['Nothing yet'],
//           rating: product.rating,
//           discount: product.discount,
//           categoryId: product.categoryId,
//           category: category,
//           description: product.description,
//           stock: product.stock,
//           userId: product.userId
//         };
//       });
//
//       this.placeholder = this.lalalala;
//
//       this.route.queryParams.subscribe((params: Params) => {
//         const categoryId = params['category'];
//         this.applyFilters(categoryId);
//       });
//     });
//   }
//
//   // applyFilters(categoryId: any): void {
//   //   if (categoryId) {
//   //     this.lalalala = this.placeholder.filter((product: Product) => product.categoryId === categoryId);
//   //   } else {
//   //     this.lalalala = this.placeholder;
//   //   }
//   // }
//   applyFilters(categoryId: any): void {
//     console.log(categoryId, categoryId.categoryId, 'asdadasdasdasdasdasd')
//     if (categoryId) {
//       this.lalalala = this.placeholder.filter((product: Product) => product.categoryId === categoryId.categoryId || categoryId);
//     } else {
//       this.lalalala = this.placeholder;
//     }
//   }
//
//   clearFilters(): void {
//     this.lalalala = this.placeholder;
//   }
// }
