import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { HomePageComponent } from './home-page/home-page.component';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProductsListCarouselComponent } from './home-page/products-list-carousel/products-list-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './home-page/product-card/product-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UpdateProductComponent } from './admin-page/update-product/update-product.component';
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {PaginatorModule} from "primeng/paginator";
import { ProductAllComponent } from './product-all/product-all.component';
import {SliderModule} from "primeng/slider";
import {DropdownModule} from "primeng/dropdown";
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import {ProductListComponent} from "./product-all/product-list/product-list.component";
import {FiltersComponent} from "./product-all/filters/filters.component";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { BasketpageComponent } from './shopping-cart/basketpage/basketpage.component';
import {TableModule} from "primeng/table";
@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    HomePageComponent,
    ProductsListCarouselComponent,
    ProductCardComponent,
    NavBarComponent,
    AdminPageComponent,
    UpdateProductComponent,
    ProductAllComponent,
    ProductListComponent,
    FiltersComponent,
    ProductCategoriesComponent,
    ShoppingCartComponent,
    BasketpageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    InputSwitchModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    PaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
