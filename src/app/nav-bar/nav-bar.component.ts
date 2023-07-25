import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductsService } from '../home-page/shared/products.service';
import { Category } from '../home-page/shared/category.model';
import {
  OrderItem,
  detailedOrderItem,
} from '../home-page/shared/orderItem.model';
import { AdminPageComponent } from '../admin-page/admin-page/admin-page.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BasketService } from '../shopping-cart/shared/basket.service';
import { CategoriesService } from '../product-categories/shared/categories.service';
import { User } from '../models/user.model';
import { Product } from '../home-page/shared/product.model';
import { ProductOperationsService } from '../home-page/shared/product-operations.service';

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
    private categoryService: CategoriesService,
    private productOperationsService: ProductOperationsService
  ) {}

  ngOnInit() {
    // used to get user's name
    this.userService.getLoggedUserObservable().subscribe((res) => {
      this.userLoggedIn = res;
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

    if (Object.keys(this.userLoggedIn).length !== 0) {
      this.productsService.getCurrentBasket().subscribe((res) => {

      });

      this.productService.getFavoriteProducts().subscribe((res) => {
        this.productService.favoriteProductsObservable.next({
          productAction: 'populate',
          allFavoriteItems: res,
        });
      });
    }

    this.productService.favoriteProductsObservable.subscribe((res) => {
      if (res.productAction === 'add') {
        this.favoriteProductsList.push(res.favoriteProduct!);
      } else if (res.productAction === 'delete') {
        this.favoriteProductsList = this.favoriteProductsList.filter(
          (product: Product) => product.id !== res.favoriteProduct!.id
        );
      } else if (res.productAction === 'reset') {
        this.favoriteProductsList = [];
      } else if (res.productAction === 'populate') {
        this.favoriteProductsList = res.allFavoriteItems!;
      } else if (res.productAction === 'update') {
      }
    });

    this.productService.getShopingCartObservable().subscribe((res) => {
      this.orderItems = res.basketOrderItems!;
    });
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

  gotoOrdersPage() {
    return this.router.navigate(['my-orders']);
  }
  gotToFavoritesPage() {
    return this.router.navigate(['my-favorites']);
  }
  showProductImage(productImage: string) {
    const imgUrl = this.productOperationsService.getProductImage(productImage);
    return imgUrl;
  }
}
