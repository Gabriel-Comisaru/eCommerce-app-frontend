import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Product } from '../home-page/shared/product.model';
import { ProductsService } from '../home-page/shared/products.service';
import { Category } from '../home-page/shared/category.model';
import {
  OrderItem,
  detailedOrderItem,
} from '../home-page/shared/orderItem.model';
import { concatMap, of, switchMap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public navProductControls: MenuItem[] = [];
  public cartProductsList: Product[] = [];
  public favoriteProductsList: Product[] = [];
  isAdmin: boolean = false;
  public productsCategories!: Category[];
  public categoryItems!: MenuItem[];
  public basketContent: OrderItem[] = [];
  public nbOfBasketProducts: number = 0;
  public detailedBasketContent: detailedOrderItem[] = [];
  // get logged user details
  public userLoggedIn: any = JSON.parse(
    localStorage.getItem('currentUser') || '{}'
  );

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthService,
    private userService: UserService
  ) {}
  ngOnInit() {
    console.log(this.userLoggedIn);

    this.userService
      .getLoggedUserObservable()
      .subscribe((res) => (this.userLoggedIn = res));
    this.productsService.getCategories().subscribe((res) => {
      this.categoryItems = res.map((category) => {
        return {
          label: category.name,
          icon: 'pi pi-fw pi-bars',
        };
      });
      this.categoryItems.push({
        label: 'All Products',
        icon: 'pi pi-fw pi-bars',
        routerLink: '/products',
      });
      this.navProductControls = [
        {
          label: 'Products',
          icon: 'pi pi-fw pi-bars',
          items: this.categoryItems,

          // command: () => {
          //   this.router.navigate(['/products']);
          // },
        },
        { label: 'Deals', icon: 'pi pi-fw pi-percentage' },
      ];
    });
    this.isAdmin = false;
    this.goToAdminPage();

    //subscribes to get nb of cart/favorite items

    // this.productsService
    //   .getShopingCartObservable()
    //   .subscribe((response) => (this.cartProductsList = response));
    // this.productsService.setInitialCartProducts();

    this.productsService
      .getfavoriteProductsObservable()
      .subscribe((response) => (this.favoriteProductsList = response));
    this.productsService.setInitialFavoriteProducts();

    // get list of items from cart only if the user is logged
    if (this.authService.isAuthenticated()) {
      this.productsService.getOrderItems().subscribe((res) => {
        this.basketContent = [...res];
        this.nbOfBasketProducts = this.basketContent.reduce(
          (acc, currValue) => acc + currValue.quantity,
          0
        );
      });
    }
  }

  goHome() {
    this.router.navigate(['']);
  }
  goToBasketPage() {
    this.router.navigate(['basket']);
  }
  goToAdminPage() {
    if (this.isAdmin) {
      this.router.navigate(['admin']);
    } else if (!this.isAdmin) {
      this.router.navigate(['']);
    }
  }

  clearStorage() {
    window.localStorage.clear();
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }
  logout() {
    this.authService.logout();
  }
  register() {
    this.authService.goToRegister();
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  goToAccountDetailsPage() {
    return this.router.navigate(['user-details']);
  }
}
