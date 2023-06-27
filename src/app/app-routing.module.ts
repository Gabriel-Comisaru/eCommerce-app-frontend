import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {ProductAllComponent} from "./product-all/product-all.component";
import {ProductCategoriesComponent} from "./product-categories/product-categories.component";
import {BasketpageComponent} from "./shopping-cart/basketpage/basketpage.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'products',
    component: ProductAllComponent,
  },
  {
    path: 'categories',
    component: ProductCategoriesComponent,
  },
  {
    path: 'products/:category',
    component: ProductAllComponent
  },
  {
    path: 'basket',
    component: BasketpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
