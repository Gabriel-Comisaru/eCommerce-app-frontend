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
import { AdminPageComponent } from '../admin-page/admin-page/admin-page.component';
import { concatMap, of, switchMap, map, Observable, combineLatest } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BasketService } from '../shopping-cart/shared/basket.service';
import { CategoriesService } from '../product-categories/shared/categories.service';
import { Subject } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { User } from '../models/user.model';

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
  public userLoggedIn: User = JSON.parse(
    localStorage.getItem('currentUser') || '{}'
  );

  public categories: any[] = [];
  // Placeholder

  // Placeholder
  public itemCategoriesAny: any[] = [];
  // Placeholder
  public itemPricesAny: any[] = [];
  public orderItems: OrderItem[] = [];

  adminDashboard!: string;

  @ViewChild(AdminPageComponent) admin!: AdminPageComponent;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthService,
    private userService: UserService,
    private basketService: BasketService,
    private productService: ProductsService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      localStorage.setItem('admin','false')
    }
    this.adminDashboard = localStorage.getItem('admin')!
    // used to get user's name
    this.userService
      .getLoggedUserObservable()
      .subscribe((res) => {
        this.userLoggedIn = res
      });
    this.productsService.getCategories().subscribe((res) => {
      this.categoryItems = res.map((category) => {
        return {
          label: category.name,
          icon: 'pi pi-fw pi-bars',
          routerLink: `/products/${category.id}`,
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
        },
        { label: 'Deals', icon: 'pi pi-fw pi-percentage' },
        {
          label: 'All Categories',
          icon: 'pi pi-th-large',
          routerLink: '/categories',
        },
      ];
    });
    this.isAdmin = false;
    console.log(this.userLoggedIn);

    if (Object.keys(this.userLoggedIn).length !== 0) {
      this.productsService.getCurrentBasket().subscribe((res) => {
        this.productsService.shoppingCartObservable.next({
          productAction: 'populate',
          basketOrderItems: res,
        });
      });
    }
    //  subjects
    this.productsService
      .getfavoriteProductsObservable()
      .subscribe((response) => (this.favoriteProductsList = response));
    this.productsService.setInitialFavoriteProducts();

    this.productService.getShopingCartObservable().subscribe((res) => {
      if (res.productAction === 'add') {
        this.orderItems.push(res.orderItem!);
      } else if (res.productAction === 'delete') {
        this.orderItems = this.orderItems.filter(
          (orderItem: OrderItem) => orderItem.id !== res.orderItem!.id
        );
      } else if (res.productAction === 'reset') {
        this.orderItems = [];
      } else if (res.productAction === 'populate') {
        this.orderItems = res.basketOrderItems!;
      }
    });
    // }
  }

  goHome() {
    this.router.navigate(['']);
  }

  goToBasketPage() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['basket']);
    } else {
      this.router.navigate(['login']);
    }
  }

  goToAdminPage() {
    this.isAdmin = !this.isAdmin
    this.productsService.adminIsOnAdminPage()
    this.productsService.checkIfAdminIsOnAdminPage
      .subscribe(res => {
        this.adminDashboard = res
        localStorage.setItem('admin', res);
        this.adminDashboard = localStorage.getItem('admin')!
        console.log(this.adminDashboard, "from navbar")
      })
    this.router.navigate(['admin/products']);
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

  goToRegisterPage() {
    this.authService.goToRegister();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  goToAccountDetailsPage() {
    return this.router.navigate(['user-details']);
  }

  getItemPrice(product: any) {
    return (product.productPrice * product.quantity).toFixed(2);
  }

  getOrderItemLength() {
    let noOfBasketProducts = 0;
    this.orderItems.forEach((item: any) => {
      noOfBasketProducts += item.quantity;
    });
    return noOfBasketProducts;
  }
}
