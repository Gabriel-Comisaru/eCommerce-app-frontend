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
    this.navProductControls = [
      {
        label: 'Products',
        icon: 'pi pi-fw pi-bars',
        items: [
          {
            label: 'Category 1',
            icon: 'pi pi-prime',
          },
          {
            label: 'Category 2',
            icon: 'pi pi-prime',
          },
          {
            label: 'Category 3',
            icon: 'pi pi-prime',
          },
          {
            label: 'Category 4',
            icon: 'pi pi-prime',
          },
          {
            label: 'Category 5',
            icon: 'pi pi-prime',
          },
        ],
      },
      { label: 'Deals', icon: 'pi pi-fw pi-percentage' },
    ];

    // create localStorage item if it doesn't exist already
    // if (localStorage.getItem('shoppingCart') === null) {
    //   localStorage.setItem(
    //     'shoppingCart',
    //     JSON.stringify(this.cartProductsList)
    //   );
    // }
    // if (localStorage.getItem('favoriteProducts') === null) {
    //   localStorage.setItem(
    //     'favoriteProducts',
    //     JSON.stringify(this.favoriteProductsList)
    //   );
    // }
    // this.cartProductsList = JSON.parse(
    //   localStorage.getItem('shoppingCart') || '[]'
    // );

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
}
