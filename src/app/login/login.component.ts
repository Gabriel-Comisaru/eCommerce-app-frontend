import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ProductsService } from '../home-page/shared/products.service';
import { concat } from 'rxjs';
import { OrderItem } from '../home-page/shared/orderItem.model';
// import { Button } from 'primeng/primeng';
// import { InputText } from 'primeng/primeng';
// import { Panel } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private productsService: ProductsService
  ) {}
  public loginErrorCause!: string;

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
              this.productsService.shoppingCartObservable.next({
                productAction: 'populate',
                basketOrderItems: res,
              });
            }
          });
          this.productsService.getFavoriteProducts().subscribe((res) => {
            this.productsService.favoriteProductsObservable.next({
              productAction: 'populate',
              allFavoriteItems: res,
            });
          });
        },
        error: (data) => {
          console.log('Cannot login!');
          console.log(data);
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
