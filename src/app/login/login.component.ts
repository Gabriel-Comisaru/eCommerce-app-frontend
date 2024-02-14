import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ProductsService } from '../home-page/shared/products.service';
import { concat } from 'rxjs';
import { FavoriteProductsServiceService } from '../home-page/shared/favorite-products-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public showPassword: boolean = false;
  public loginErrorCause!: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private productsService: ProductsService,
    private favoriteProductsService: FavoriteProductsServiceService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const val = this.loginForm.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password).subscribe({
        next: (data) => {
          concat(
            this.userService.getLoggedInUser(),
            this.productsService.getCurrentBasket()
          ).subscribe((res) => {
            if (res instanceof Array) {
            }
          });
          this.favoriteProductsService.getFavoriteProducts().subscribe();
        },
        error: (data) => {
          console.log('Cannot login!');
          switch (data.error.message) {
            case 'Something went wrong': {
              this.loginErrorCause = 'username';
              break;
            }
            case 'Invalid Credentials': {
              this.loginErrorCause = 'password';
              break;
            }
            default:
              this.loginErrorCause = 'unknown';
          }
        },
      });
    }
  }
}
