import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarouselModule } from 'primeng/carousel';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
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
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductsListCarouselComponent,
    ProductCardComponent,
    NavBarComponent,
    AdminPageComponent,
    UpdateProductComponent,
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
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
