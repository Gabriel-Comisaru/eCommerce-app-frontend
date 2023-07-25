import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { RegisterFields } from '../models/register.model';

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
    inputType: string;
    validators: ValidatorFn[];
    errors?: {};
  }> = [
    {
      fieldName: 'First name',
      controlName: 'first_name',
      inputType: 'text',

      validators: [
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ],
      errors: {
        length: 'length must be between 2 and 15 characters.',
        required: 'is required',
      },
    },
    {
      fieldName: 'Last name',
      controlName: 'last_name',
      inputType: 'text',
      validators: [
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ],
      errors: {
        length: 'length must be between 2 and 15 characters.',
        required: 'is required',
      },
    },
    {
      fieldName: 'Username',
      controlName: 'username',
      inputType: 'text',
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ],
      errors: {
        length: 'length must be between 2 and 15 characters.',
        required: 'is required',
      },
    },
    {
      fieldName: 'Email',
      controlName: 'email',
      inputType: 'text',
      validators: [Validators.email, Validators.required],
      errors: {
        email: 'is not valid.',
        required: 'is required',
      },
    },
    {
      fieldName: 'Password',
      controlName: 'password',
      inputType: 'password',
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
      errors: {
        length: 'length must be between 3 and 20 characters.',
        required: 'is required',
      },
    },

    {
      fieldName: 'Is this an ADMIN account?',
      inputType: 'checkbox',
      controlName: 'role',
      validators: [],
    },
  ];

  ngOnInit() {
    console.log(this.getFieldValidity('last_name'));
    this.registerFormFields.forEach((field) =>
      this.registerForm.addControl(
        field.controlName,
        new FormControl('', field.validators)
      )
    );

    console.log(this.registerForm.controls);
  }
  errorRequired(fieldName: string) {
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
    const registerData: RegisterFields = {
      first_name: val.first_name,
      last_name: val.last_name,
      username: val.username,
      email: val.email,
      password: val.password,
      role: val.role[0] !== '' ? val.role[0] : 'USER',
    };
    this.authService.register(registerData).subscribe({
      next: (data) =>
        this.userService.getLoggedInUser().subscribe((user) => {
          console.log('crt user:', user);
        }),
    });
  }

  getFieldValidity(controlName: string) {
    const control = this.registerForm.get(controlName);

    return control?.invalid && control?.dirty;
  }

  checkValue(event: Event) {
    console.log(event);
    console.log(this.registerForm.controls);
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
