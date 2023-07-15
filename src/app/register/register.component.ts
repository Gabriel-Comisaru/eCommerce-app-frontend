import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  registerForm = this.fb.group({
    first_name: [''],
    last_name: [''],
    username: [''],
    email: [''],
    password: [''],
  });
  public registerFormFields: Array<{
    fieldName: string;
    controlName: string;
    validators: any;
  }> = [
    {
      fieldName: 'First name',
      controlName: 'first_name',
      validators: [Validators.minLength(2), Validators.maxLength(15)],
    },
    {
      fieldName: 'Last name',
      controlName: 'last_name',
      validators: [Validators.minLength(2), Validators.maxLength(15)],
    },
    {
      fieldName: 'Username',
      controlName: 'username',
      validators: [Validators.required],
    },
    {
      fieldName: 'Email',
      controlName: 'email',
      validators: [Validators.email, Validators.required],
    },
    {
      fieldName: 'Password',
      controlName: 'password',
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
    },
  ];

  ngOnInit() {}
  // errorCondition(fieldName: string) {
  //   return (
  //     this.registerForm.controls[
  //       fieldName as keyof typeof this.registerForm.controls
  //     ].valid ||
  //     !this.registerForm.controls[
  //       fieldName as keyof typeof this.registerForm.controls
  //     ].dirty
  //   );
  // }

  onSubmit() {
    const val = this.registerForm.value;
    console.log(val);
    if (
      val.first_name &&
      val.last_name &&
      val.username &&
      val.email &&
      val.password
    ) {
      this.authService
        .register(
          val.first_name,
          val.last_name,
          val.username,
          val.email,
          val.password
        )
        .subscribe({
          next: (data) =>
            this.userService.getLoggedInUser().subscribe((user) => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              console.log('crt user:', user);
            }),
        });
    }
  }
}
