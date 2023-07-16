import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject, debounce, delay, of } from 'rxjs';
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
  // is type assignation right?

  registerForm: FormGroup = new FormGroup({});
  // registerForm = this.fb.group({
  //   first_name: [
  //     '',
  //     [Validators.minLength(2), Validators.maxLength(15), Validators.required],
  //   ],
  //   last_name: [
  //     '',
  //     [Validators.minLength(2), Validators.maxLength(15), Validators.required],
  //   ],
  //   username: ['', [Validators.required]],
  //   email: ['', [Validators.email, Validators.required]],
  //   password: [
  //     '',
  //     [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
  //   ],
  // });
  public registerFormFields: Array<{
    fieldName: string;
    controlName: string;
    validators: any;
  }> = [
    {
      fieldName: 'First name',
      controlName: 'first_name',
      validators: [
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ],
    },
    {
      fieldName: 'Last name',
      controlName: 'last_name',
      validators: [
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ],
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

  ngOnInit() {
    this.registerFormFields.forEach((field) =>
      this.registerForm.addControl(
        field.controlName,
        new FormControl('', field.validators)
      )
    );
  }
  errorRequired(fieldName: string) {
    console.log(this.registerForm.controls);
    return (
      !this.registerForm.controls[
        fieldName as keyof typeof this.registerForm.controls
      ].errors?.['required'] ||
      !this.registerForm.controls[
        fieldName as keyof typeof this.registerForm.controls
      ].touched
    );
  }
  errorLength(fieldName: string) {
    return (
      this.registerForm.controls[
        fieldName as keyof typeof this.registerForm.controls
      ].errors?.['minlength'] ||
      this.registerForm.controls[
        fieldName as keyof typeof this.registerForm.controls
      ].errors?.['maxlength']
    );
  }
  errorEmail(fieldName: string) {
    return this.registerForm.controls[
      fieldName as keyof typeof this.registerForm.controls
    ].errors?.['email'];
  }

  // getNbOfCharacters(control: string) {
  //   return this.registerForm.get(control)?.errors;
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

// fa eroare pentru cazul in care exista email duplicat
// throw error la subscriber
// add pattern to password

// how do i add debounce time to validator response
// as putea sa fac pe erori chestia aia? sa fac valorile observable si sa pun pipe si delay?
// add repeat password field
// sau la email fac on blur

// make modal for unauthorized access
