import { Component } from '@angular/core';

import { ProductsService } from './shared/products.service';
import { Product } from './shared/product.model';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  public productsList!: Product[];
  public productsWithDiscountApplied: Product[] = [];
  public mostSelledProducts: Product[] = [];
  public isLoggedIn: boolean = true; //set to default true just for display purposes
  constructor(private productsService: ProductsService) {}
  ngOnInit() {
    // getting mock list of products and mapping it according to my interface
    this.productsService.getProducts().subscribe((list) => {
      // this.ProductsList = list.products.map((product: any) => {
      //   return {
      //     id: product.id,
      //     name: product.title,
      //     photos: product.images,
      //     price: product.price,
      //     rating: Math.floor(product.rating),
      //     reviews: ['No reviews available'],
      //     discount: product.discountPercentage,
      //     category: product.category,
      //     description: product.description,
      //     stock: product.stock,
      //   };
      // });
      this.productsList = list;
      console.log(this.productsList);

      if (this.productsList) {
        this.productsWithDiscountApplied = this.productsList.filter(
          (product) => product.discountPercentage > 0
        );

        this.mostSelledProducts = this.productsList.filter(
          (product) => product.price < 200
        );
      }
    });
  }
}

// trebuie sa mai fac serviciul de search
// si atunci cand fac searchul sa mi se modifice ruta

//add to cart service
//add to favorite service
