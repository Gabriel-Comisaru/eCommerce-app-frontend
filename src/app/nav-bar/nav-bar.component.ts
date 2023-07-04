import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MockProductDetailed } from '../home-page/shared/mockProduct.model';
import { MockProductsService } from '../home-page/shared/mock-products.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public navProductControls!: MenuItem[];
  public cartProductsList: MockProductDetailed[] = [];
  public favoriteProductsList: MockProductDetailed[] = [];
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private mockProductsService: MockProductsService
  ) {}
  ngOnInit() {
    this.isAdmin = false;
    this.goToAdminPage();
    this.navProductControls = [
      {
        label: 'Products',
        icon: 'pi pi-fw pi-bars',
        routerLink: '/products',
        // command: () => {
        //   this.router.navigate(['/products']);
        // },
      },
      { label: 'Deals', icon: 'pi pi-fw pi-percentage' },
    ];

    this.mockProductsService
      .getShopingCartObservable()
      .subscribe((response) => (this.cartProductsList = response));
    this.mockProductsService.setInitialCartProducts();
    this.mockProductsService
      .getfavoriteProductsObservable()
      .subscribe((response) => (this.favoriteProductsList = response));
    this.mockProductsService.setInitialFavoriteProducts();
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
