import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public items!: MenuItem[];
  isAdmin: boolean = false;
  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink:"/" },
      { label: 'Products', icon: 'pi pi-fw pi-bars' },
      { label: 'Deals', icon: 'pi pi-fw pi-heart' },
      { label: 'Login/Register', icon: 'pi pi-fw pi-user' },
    ];
  }
}
