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
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HomePageComponent } from './home-page/home-page.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProductsListCarouselComponent } from './home-page/products-list-carousel/products-list-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './home-page/product-card/product-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';
import { ProductAllComponent } from './product-all/product-all.component';
import {SliderModule} from "primeng/slider";
import {DropdownModule} from "primeng/dropdown";
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import {ProductListComponent} from "./product-all/product-list/product-list.component";
import {FiltersComponent} from "./product-all/filters/filters.component";
@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    HomePageComponent,
    ProductsListCarouselComponent,
    ProductCardComponent,
    NavBarComponent,
    ProductAllComponent,
    ProductListComponent,
    FiltersComponent,
    ProductCategoriesComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    GalleriaModule,
    StyleClassModule,
    CardModule,
    RatingModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    MenubarModule,
    CarouselModule,
    TagModule,
    InputSwitchModule,
    TabMenuModule,
    SliderModule,
    DropdownModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
