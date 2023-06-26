import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public navProductControls!: MenuItem[];

  isAdmin: boolean = false;

  constructor(private router: Router) {}
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
  }

  goHome() {
    this.router.navigate(['']);
  }
}
