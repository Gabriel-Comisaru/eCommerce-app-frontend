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
    private userService: UserService
  ) {}

  registerForm: FormGroup = new FormGroup({});

  public registerFormFields: Array<{
    fieldName: string;
    controlName: string;
    inputType: string;
    validators: ValidatorFn[];
    placeholder?: string;
    errors?: {};
  }> = [
    {
      fieldName: 'First name',
      controlName: 'first_name',
      inputType: 'text',
      placeholder: 'John',
      validators: [
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ],
      errors: {
        length: 'length must be between 2 and 15 characters.',
        required: 'is required.',
      },
    },
    {
      fieldName: 'Last name',
      controlName: 'last_name',
      inputType: 'text',
      placeholder: 'Smith',
      validators: [
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ],
      errors: {
        length: 'length must be between 2 and 15 characters.',
        required: 'is required.',
      },
    },
    {
      fieldName: 'Username',
      controlName: 'username',
      inputType: 'text',
      placeholder: 'johnsmith1',
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ],
      errors: {
        length: 'length must be between 2 and 15 characters.',
        required: 'is required.',
      },
    },
    {
      fieldName: 'Email',
      controlName: 'email',
      inputType: 'text',
      placeholder: 'johnsmith@gmail.com',
      validators: [Validators.email, Validators.required],
      errors: {
        email: 'is not valid.',
        required: 'is required.',
      },
    },
    {
      fieldName: 'Password',
      controlName: 'password',
      inputType: 'password',
      placeholder: '',
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
      errors: {
        length: 'length must be between 3 and 20 characters.',
        required: 'is required.',
      },
    },

    {
      fieldName: 'This is an ADMIN account:',
      inputType: 'checkbox',
      controlName: 'role',
      validators: [],
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

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const val = this.registerForm.value;
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
        this.userService.getLoggedInUser().subscribe((user) => {}),
    });
  }

  getFieldValidity(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control?.invalid && control?.dirty;
  }
  getField(controlName: string) {
    return this.registerForm.get(controlName);
  }
}
