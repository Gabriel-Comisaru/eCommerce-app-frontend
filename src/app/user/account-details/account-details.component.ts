import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AdressServiceService } from 'src/app/shopping-cart/shared/adress-service.service';
import { UserAddress } from 'src/app/models/user-address.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit{
  loggedInUser: User = JSON.parse(
    localStorage.getItem('currentUser') || '{}'
  );

  userForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  userAddresses: UserAddress[] = [];

  userAddressForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    county: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
  });
  counties: any = [];
  cities: any = [];
  selectedAddress: UserAddress = JSON.parse(
    localStorage.getItem('mainAddressId') || '{}'
  );
  header: string = '';
  visible: boolean = false;
  addressLength = Object.entries(this.selectedAddress);

  constructor(
    private userService: UserService,
    private addressService: AdressServiceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCounties();
    this.addressService.getUserAddresses(this.loggedInUser.id!).subscribe(addresses => {
      this.userAddresses = addresses;
    });
    this.userAddressForm.controls.city.disable();

    this.userForm.controls.username.setValue(this.loggedInUser.username!);
    this.userForm.controls.email.setValue(this.loggedInUser.email!);
  }

  getCounties() {
    this.addressService.getCounties().subscribe((list: any) => {
      this.counties = list;
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

  showDialog() {
    this.visible = true;
    this.header = 'Add new address';
  }

  submitAddress() {
    let address: UserAddress = {
      first_name: String(this.userAddressForm.controls.firstName.value),
      last_name: String(this.userAddressForm.controls.lastName.value),
      phone_number: String(this.userAddressForm.controls.phone.value),
      address: String(this.userAddressForm.controls.address.value),
      county: String(this.userAddressForm.controls.county.value),
      city: String(this.userAddressForm.controls.city.value)
    }

    if (this.header === 'Add new address') {
      this.addressService.setAddress(address);
      setTimeout(() => {
        this.addressService.getUserAddresses(this.loggedInUser.id!).subscribe(addresses => {
          address = addresses[addresses.length-1];
          this.userAddresses.push(address);
        });
      }, 1000);
      const message = "Address creation was successfull!";
      this.messageService.add({
        severity: 'success',
        summary: 'Address created',
        detail: message,
        life: 4000,
      });
    } else if (this.header === 'Edit address') {
      this.addressService.updateAddress(this.selectedAddress.id!, address).subscribe(() => {
        this.addressService.getUserAddresses(this.loggedInUser.id!).subscribe(addresses => {
          this.userAddresses = addresses;
        });
      });
      const message = "You changed your address successfully!";
      this.messageService.add({
        severity: 'success',
        summary: 'Address changed',
        detail: message,
        life: 4000,
      });
    }
    this.cancel(); 
  }

  editAddress(address: any) {
    this.visible = true;
    this.header = 'Edit address';
    this.selectedAddress = address;
    this.userAddressForm.controls.city.enable();
    this.userAddressForm.controls.firstName.setValue(address.first_name);
    this.userAddressForm.controls.lastName.setValue(address.last_name);
    this.userAddressForm.controls.phone.setValue(address.phone_number);
    this.userAddressForm.controls.county.setValue(address.county);
    this.getCities();
    setTimeout(() => {
      this.userAddressForm.controls.city.setValue(address.city);
    }, 1000);
    this.userAddressForm.controls.address.setValue(address.address);
  }

  cancel() {
    this.visible = false;
    this.userAddressForm.reset();
    this.userAddressForm.controls.city.disable();
  }

  deleteAddress(address: any) {
    this.addressService.deleteAddress(address.id).subscribe(() =>{
      this.addressService.getUserAddresses(this.loggedInUser.id!).subscribe(addresses => {
        this.userAddresses = addresses;
      });
    }); 
  }

  setMainAddress(selectedAddress: UserAddress) {
    localStorage.setItem('mainAddress', JSON.stringify(selectedAddress));
    localStorage.setItem('mainAddressId', `${selectedAddress.id}`);
  }

  editCredentials() {
    const user: User = {
      username: this.userForm.controls.username.value!,
      email: this.userForm.controls.email.value!,
      password: this.userForm.controls.password.value!
    }
    console.log(user);
    // this.userService.updateUser(user.username!, user).subscribe();
  }
}
