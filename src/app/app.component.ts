import { Component } from '@angular/core';
import { MockProductsService } from './home-page/shared/mock-products.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private productsService: MockProductsService) {}

  ngOnInit() {
    this.productsService.getTokenFromLocalStorage();
  }
}
