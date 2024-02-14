import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  activeIndex: number = 0;
  tabs: MenuItem[] = [
    {
      label: 'Products',
      routerLink: 'products'
    },
    {
      label: 'Orders',
      routerLink: 'orders'
    }
  ]
  activeItem: MenuItem = this.tabs[0];

  constructor() {
  }

  ngOnInit() {
  }
}
