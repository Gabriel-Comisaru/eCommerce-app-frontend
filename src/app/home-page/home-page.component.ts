import { Component } from '@angular/core';
import { ProductsService } from './shared/products.service';
import { Product } from './shared/product.model';
import { AuthService } from '../services/auth.service';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  public isLoggedIn: boolean = this.authService.isAuthenticated();
  public dataIsLoading: boolean = true;
  public sectionsName: string[] = [
    'Recommended for you',
    'Discounted products',
    'Hottest products',
  ];
  public listOfSections: {
    list: Product[];
    condition?: boolean;
  }[] = [];
  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    combineLatest(
      this.productsService.getProducts(),
      this.productsService.getAllReviews(),
      this.productsService.getDiscountedProducts(),
      this.productsService.getMostSelledProducts()
    ).subscribe((res) => {
      const [list, reviews, discountedProducts, mostSelledProducts] = res;

      this.listOfSections = [
        {
          list: list,
          condition: this.isLoggedIn,
        },
        { list: discountedProducts },
        { list: mostSelledProducts },
      ];
      this.dataIsLoading = false;
    });
  }

  goToAllProductsPage() {
    return this.router.navigate(['/products']);
  }
}
