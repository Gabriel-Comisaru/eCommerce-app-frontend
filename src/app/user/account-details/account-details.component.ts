import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AdressServiceService } from 'src/app/shopping-cart/shared/adress-service.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit{
  loggedInUser: User = JSON.parse(
    localStorage.getItem('currentUser') || '{}'
  );

  userAddressForm = this.fb.group({
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    county: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
  });
  counties: any = [];
  cities: any = [];

  constructor(private userService: UserService,
              private addressService: AdressServiceService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userService.getLoggedUserObservable().subscribe((res) => {
      this.loggedInUser = res;
    });
    this.getCounties();
    this.userAddressForm.controls.city.disable();
  }

  getCounties() {
    this.addressService.getCounties().subscribe((list: any) => {
      this.counties = list;
      console.log(list);
    });
  }

  getCities() {
    this.userAddressForm.controls.city.enable();

    this.addressService
      .getCities(this.userAddressForm.controls.county.value!)
      .subscribe((list: any) => {
        this.cities = list;
      });
  }

  onSubmitAddress() {
    console.log(this.userAddressForm.value); 
  }
}
