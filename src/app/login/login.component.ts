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

  ngOnInit() {
    console.log('login form');
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
          console.log('User logged in');
          this.userService.getLoggedInUser().subscribe((user) => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log('crt user:', user);
          });
        },
        error: (data) => {
          console.log('Error Encountered!');
          alert('Cannot login!');
        },
      });
    }
  }
}
