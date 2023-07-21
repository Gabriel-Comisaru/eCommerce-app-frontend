import {AdminProductListComponent} from './admin-page/admin-product-list.component';
import {AdminOrdersListComponent} from "./admin-page/admin-orders-list/admin-orders-list.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { BasketpageComponent } from './shopping-cart/basketpage/basketpage.component';
import {AdminPageComponent} from "./admin-page/admin-page/admin-page.component";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { AlreadyLoggedGuard } from './services/already-logged.guard';
import { AccountDetailsComponent } from './account-details/account-details.component';
import {OrderDataComponent} from "./shopping-cart/order-data/order-data.component";
import {OrderSummaryComponent} from "./shopping-cart/order-summary/order-summary.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AlreadyLoggedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AlreadyLoggedGuard],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  children:[
    {
      path: 'products',
      component: AdminProductListComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'orders',
      component: AdminOrdersListComponent,
      canActivate: [AuthGuard],
    }
  ]
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
    component: ProductAllComponent,
  },
  {
    path: 'basket',
    component: BasketpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'order-data',
    component: OrderDataComponent
  },
  {
    path: 'user-details',
    component: AccountDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-summary',
    component: OrderSummaryComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
