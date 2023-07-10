import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/home-page/shared/product.model';
import { BasketService } from '../../shopping-cart/shared/basket.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() mockProduct!: Product[];
  @Input() lalalala!: Product[];

  constructor(private basketService: BasketService) {}

  filterList(category: string) {
    console.log('Selected Category:', category);
    category
      ? this.mockProduct.filter(
          (product: Product) => product.category === category
        ) && console.log(this.mockProduct)
      : this.mockProduct && console.log('aaa');
  }
  addToBasket(product: Product): void {
    this.basketService.addToBasket(product);
    this.basketService.log();
  }

  ngOnInit(): void {
    console.log(this.lalalala);
  }
}
