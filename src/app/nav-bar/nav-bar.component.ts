import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public navMainControls!: MenuItem[];
  public navProductControls!: MenuItem[];
  isAdmin: boolean = false;
  constructor(private router: Router) {}
  ngOnInit() {
    this.navMainControls = [
      { label: 'Login/Register', icon: 'pi pi-fw pi-user' },
    ];
    this.navProductControls = [
      { label: 'Products', icon: 'pi pi-fw pi-bars' },
      { label: 'Deals', icon: 'pi pi-fw pi-percentage' },
      {
        label: 'Cart',
        icon: 'pi pi-fw pi-shopping-cart',
      },
      { label: 'Favorite', icon: 'pi pi-fw pi-heart' },
    ];
  }

  goHome() {
    this.router.navigate(['']);
  }
}
