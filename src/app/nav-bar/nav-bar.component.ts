import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import {Router} from "@angular/router";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public items!: MenuItem[];
  isAdmin: boolean = false;


  constructor(private router:Router) {
  }

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Products', icon: 'pi pi-fw pi-bars' },
      { label: 'Deals', icon: 'pi pi-fw pi-heart' },
      { label: 'Login/Register', icon: 'pi pi-fw pi-user' },
    ];
  }

  goToAdminPage() {
    if(this.isAdmin){
      this.router.navigate(['admin'])
    }
    else if(!this.isAdmin){
      this.router.navigate([''])
    }
  }
}
