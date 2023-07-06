import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Product } from '../home-page/shared/product.model';
import { ProductsService } from '../home-page/shared/products.service';
import { Category } from '../home-page/shared/category.model';
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

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {}
  ngOnInit() {
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

    this.productsService
      .getShopingCartObservable()
      .subscribe((response) => (this.cartProductsList = response));
    this.productsService.setInitialCartProducts();
    this.productsService
      .getfavoriteProductsObservable()
      .subscribe((response) => (this.favoriteProductsList = response));
    this.productsService.setInitialFavoriteProducts();
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
}
