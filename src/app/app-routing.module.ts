import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {ProductAllComponent} from "./product-all/product-all.component";
import {ProductListComponent} from "./product-all/product-all-list/product-list/product-list.component";
import {ProductAllListComponent} from "./product-all/product-all-list/product-all-list.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'all',
    component: ProductAllComponent,
  },
  {
    path: 'products',
    component: ProductAllListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
