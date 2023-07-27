import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ProductsService} from "../../home-page/shared/products.service";
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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout()
  }

  goBachToHomePage() {
    this.router.navigate([''])

  }
}
