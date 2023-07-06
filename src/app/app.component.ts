import { Component } from '@angular/core';
import { ProductsService } from './home-page/shared/products.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService
      .getToken('test1', 'test1')
      .subscribe((res) => localStorage.setItem('token', res.token));
  }
}
