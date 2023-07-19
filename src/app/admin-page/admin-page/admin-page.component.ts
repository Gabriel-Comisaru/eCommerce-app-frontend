import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  listName: any = [
    {name: 'Products List'},
    {name: 'Orders List'}
  ]

  selected!: any;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selected = this.listName[0];
    if (this.router.url.split('/')[2] == 'products') {
      this.selected = this.listName[0];
    } else if (this.router.url.split('/')[2] == 'orders') {
      this.selected = this.listName[1];
    } else {
      this.selected = '';
    }
  }

  goToProductsOrOrders() {
    this.selected.name === 'Products List' ? this.router.navigate(['products'], {relativeTo: this.route})
      : this.router.navigate(['orders'], {relativeTo: this.route})
  }

}
