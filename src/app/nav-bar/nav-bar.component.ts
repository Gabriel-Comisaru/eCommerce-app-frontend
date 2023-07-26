import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductsService } from '../home-page/shared/products.service';
import { OrderItem, } from '../home-page/shared/orderItem.model';
import { AdminPageComponent } from '../admin-page/admin-page/admin-page.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BasketService } from '../shopping-cart/shared/basket.service';
import { User } from '../models/user.model';
import { Product } from '../home-page/shared/product.model';
import { OverlayPanel } from 'primeng/overlaypanel';

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
  public userLoggedIn: User = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') as any) : null;
  public categories: any[] = [];
  public itemCategoriesAny: any[] = [];
  public itemPricesAny: any[] = [];
  public orderItems: OrderItem[] = [];


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
    private basketService: BasketService,
    private productService: ProductsService,
  ) {
  }

  ngOnInit() {
    this.userService.getLoggedUserObservable().subscribe((res) => {
      this.userLoggedIn = res;
    });

    this.productsService.getCategories().subscribe((res) => {
      this.mapCategories(res);
    });

    if (this.userLoggedIn) {
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

  mapCategories (categories:any) {
    this.categoryItems = categories.map((category:any) => {
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
      {label: 'Deals', icon: 'pi pi-fw pi-percentage'},
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
  gotoOrdersPage() {
    this.userOverlay.hide();

    return this.router.navigate(['my-orders']);
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

  clearStorage() {
    window.localStorage.clear();
  }

  goToLoginPage() {
    this.router.navigate(['login']);
    this.myAccountOverlay.hide();
  }

  logout() {
    this.authService.logout();
    this.userOverlay.hide();
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
    return this.router.navigate(['my-orders']);
  }

  gotToFavoritesPage() {
    this.favoriteItemsOverlay.hide();
    return this.router.navigate(['my-favorites']);
  }
}
