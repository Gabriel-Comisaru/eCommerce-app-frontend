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
import { concatMap, of, switchMap, map, Observable, combineLatest } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BasketService } from '../shopping-cart/shared/basket.service';
import { CategoriesService } from '../product-categories/shared/categories.service';
import { Subject } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

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
  public itemNames: Map<number, string> = new Map<number, string>();
  public itemPrices: Map<number, number> = new Map<number, number>();
  public itemCategories: Map<number, string> = new Map<number, string>();
  public categories: any[] = [];
  // Placeholder
  public itemNamesAny: any[] = [];
  // Placeholder
  public itemCategoriesAny: any[] = [];
  // Placeholder
  public itemPricesAny: any[] = [];
  public orderItems: any = [];

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthService,
    private userService: UserService,
    private basketService: BasketService,
    private productService: ProductsService,
    private categoryService: CategoriesService
  ) {
    this.basketService.NavBarComponent = this;
  }

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

          // command: () => {
          //   this.router.navigate(['/products']);
          // },
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

    if (this.authService.isAuthenticated()) {
      this.productsService
        .getfavoriteProductsObservable()
        .subscribe((response) => (this.favoriteProductsList = response));
      this.productsService.setInitialFavoriteProducts();
      // this.productsService.getShopingCartObservable().subscribe()
      this.loadBasketContent();

      this.basketService
        .getOrderItems()
        .subscribe((res) => (this.orderItems = res));

      this.productService.getShopingCartObservable().subscribe((res) => {
        if (res.action === 'add') {
          this.orderItems.push(res);
        } else if (res.action === 'delete') {
          this.orderItems = this.orderItems.filter(
            (orderItem: OrderItem) => orderItem.id !== res.id
          );
          console.log(this.orderItems);
        }

        this.orderItems = this.orderItems.map((item: any) => {
          return {
            id: item.id,
            name: this.itemNames.get(item.productId) || '',
            productId: item.productId,
            orderId: item.orderId,
            quantity: item.quantity,
            price: this.itemPrices.get(item.productId) || 0,
          };
        });
      });

      //   this.orderItems = allOrderItems.map((item: any) => {
      //     return {
      //       id: item.id,
      //       name: this.itemNames.get(item.productId) || '',
      //       productId: item.productId,
      //       orderId: item.orderId,
      //       quantity: item.quantity,
      //       price: this.itemPrices.get(item.productId) || 0,
      //     };
      //   });
      // });
      // this.productService.getShopingCartObservable().subscribe((res) => {
      //   this.orderItems.push(res);
      //   console.log(this.orderItems);

      // });
    }
  }
  loadBasketContent() {
    //extracting the name and the price of the products
    this.productService.getProducts().subscribe((list) => {
      this.itemNamesAny = list.map((product: any) => {
        this.itemNames.set(product.id, product.name);
        this.itemPrices.set(product.id, product.price);
      });
    });

    // setTimeout(() => {
    //   this.basketService.getOrderItems().subscribe((list: any[]) => {

    //   });
    // }, 1);
    // console.log(this.orderItems);
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
    this.isAdmin = !this.isAdmin;

    if (this.isAdmin) {
      this.router.navigate(['admin']);
    } else {
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

  getItemPrice(product: any) {
    return (product.price * product.quantity).toFixed(2);
  }

  getOrderItemLength() {
    let noOfBasketProducts = 0;
    this.orderItems.forEach((item: any) => {
      noOfBasketProducts += item.quantity;
    });
    return noOfBasketProducts;
  }
}
