import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HomePageComponent } from './home-page/home-page.component';

import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProductsListCarouselComponent } from './home-page/products-list-carousel/products-list-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';

import { BadgeModule } from 'primeng/badge';

import { OverlayPanelModule } from 'primeng/overlaypanel';
@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    HomePageComponent,
    ProductsListCarouselComponent,

    NavBarComponent,
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
    FormsModule,
    RatingModule,
    OverlayPanelModule,
    BadgeModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
