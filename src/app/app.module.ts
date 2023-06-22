import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProductsListCarouselComponent } from './home-page/products-list-carousel/products-list-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './home-page/product-card/product-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductsListCarouselComponent,
    ProductCardComponent,
    NavBarComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
