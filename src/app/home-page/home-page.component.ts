import { Component } from '@angular/core';

import { ProductsService } from './shared/products.service';
import { Product } from './shared/product.model';
import { AuthService } from '../helpers/auth.service';
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

  constructor(private productsService: ProductsService, private authService: AuthService) {}

  ngOnInit() {
    // get token - on home page initialization which you will use by getting it from local storage
    this.productsService
      .getToken('test1', 'test1')
      .subscribe((res) => localStorage.setItem('token', res.token));

    // get a list of products
    this.productsService.getProducts().subscribe((list) => {
      this.productsList = list;
      console.log(this.productsList);

      // apply filters for second and third carousel - will be moved in backend
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
