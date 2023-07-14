import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
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
    private router: Router
  ) {}
  public loginError: boolean = false;

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
          this.userService.getLoggedInUser().subscribe((user) => {
            localStorage.setItem('currentUser', JSON.stringify(user));
          });
        },
        error: (data) => {
          console.log('Cannot login!');
          console.log(data);
          data.error.message = 'Something went wrong';
          data.error.messsage = 'Invalid Credentials';
        },
      });
    }
  }
}
