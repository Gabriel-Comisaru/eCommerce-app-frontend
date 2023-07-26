import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductsService } from '../home-page/shared/products.service';
import { OrderItem } from '../home-page/shared/orderItem.model';
import { AdminPageComponent } from '../admin-page/admin-page/admin-page.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Product } from '../home-page/shared/product.model';
import { OverlayPanel } from 'primeng/overlaypanel';
import { FavoriteProductsServiceService } from '../home-page/shared/favorite-products-service.service';
import { BASE_URL_API } from '../settings';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public navProductControls: MenuItem[] = [];
  public favoriteProductsList: Product[] = [];
  public isAdmin: boolean = false;
  public categoryItems!: MenuItem[];
  public userLoggedIn: User = localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser') as any)
    : null;
  public categories: any[] = [];
  public itemCategoriesAny: any[] = [];
  public itemPricesAny: any[] = [];
  public orderItems: OrderItem[] = [];
  baseUrlApi = BASE_URL_API;
  adminDashboard!: string;

  @ViewChild(AdminPageComponent) admin!: AdminPageComponent;
  @ViewChild('userOptions') userOverlay!: OverlayPanel;
  @ViewChild('myAccount') myAccountOverlay!: OverlayPanel;
  @ViewChild('shoppingCart') shoppingCartOverlay!: OverlayPanel;
  @ViewChild('favoriteItems') favoriteItemsOverlay!: OverlayPanel;
  constructor(
    private router: Router,
    private productsService: ProductsService,
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductsService,
    private favoriteProductsService: FavoriteProductsServiceService
  ) {}

  ngOnInit() {
    this.userService.getLoggedUserObservable().subscribe((res) => {
      this.userLoggedIn = res;
    });
    this.productsService.getCategories().subscribe((res) => {
      this.mapCategories(res);
    });
    this.favoriteProductsService.favoriteProductsObservable.subscribe((res) => {
      this.favoriteProductsList = res.favoriteProducts!;
    });
    this.productService.getShopingCartObservable().subscribe((res) => {
      this.orderItems = res.basketOrderItems!;
    });
    console.log(this.userLoggedIn);
    if (this.userLoggedIn) {
      this.productsService.getCurrentBasket().subscribe();
      this.favoriteProductsService.getFavoriteProducts().subscribe();
    }
  }

  mapCategories(categories: any) {
    this.categoryItems = categories.map((category: any) => {
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
    this.shoppingCartOverlay.hide();
  }

  goToAdminPage() {
    this.isAdmin = !this.isAdmin;
    this.router.navigate(['admin/products']);
  }

  goToLoginPage() {
    this.router.navigate(['login']);
    this.myAccountOverlay.hide();
  }

  logout() {
    this.authService.logout();
    this.userOverlay.hide();

    this.favoriteProductsService.favoriteProductsObservable.next({
      favoriteProducts: [],
    });

    this.productsService.shoppingCartObservable.next({
      basketOrderItems: [],
    });
  }

  goToRegisterPage() {
    this.authService.goToRegister();
    this.myAccountOverlay.hide();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  goToAccountDetailsPage() {
    this.userOverlay.hide();
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
    this.userOverlay.hide();

    return this.router.navigate(['my-orders']);
  }

  gotToFavoritesPage() {
    this.favoriteItemsOverlay.hide();
    return this.router.navigate(['my-favorites']);
  }
}
