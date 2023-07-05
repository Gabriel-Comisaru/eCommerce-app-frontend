import { Component } from '@angular/core';

import { MockProductsService } from './shared/mock-products.service';
import { MockProductDetailed } from './shared/mockProduct.model';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  public mockProductsList!: MockProductDetailed[];

  constructor(private mockProductsService: MockProductsService) {}
  ngOnInit() {
    // getting mock list of products and mapping it according to my interface
    this.mockProductsService.getProducts().subscribe((list) => {
      this.mockProductsList = list;
    });
  }
}
