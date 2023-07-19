import {Component, OnInit} from '@angular/core';
import {AdressServiceService} from "../shared/adress-service.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent implements OnInit {
  constructor(
    private addressService: AdressServiceService,
    private fb: FormBuilder
  ) {
  }

  userAddressForm = this.fb.group({
      fullName: [''],
      phone: [''],
      county: [''],
      city: [''],
      address: [''],
    }
  )
  loading: boolean =false;
  cities: any = [];
  visible: boolean = false;
  header: string = '';
  counties: any = [];
  selectedAddress: any = [];
  ngOnInit(): void {
    this.getCounties()
    this.userAddressForm.controls.city.disable();

  }

  getCounties() {
    this.addressService.getCounties().subscribe((list: any) => {
      this.counties = list;
    })
  }

  getCities() {
    this.userAddressForm.controls.city.enable();

    this.addressService.getCities(this.userAddressForm.controls.county.value!).subscribe((list: any) => {
      this.cities = list;
      console.log(list)
    })

  }

  showDialog() {
    this.visible = true;
    this.header = 'Add new address';
  }

  editAddress(address: any) {
    this.visible = true;
    this.header = 'Edit address';
    this.selectedAddress = address;
    this.userAddressForm.controls.fullName.setValue(address.fullName);
    this.userAddressForm.controls.phone.setValue(address.phone);
    this.userAddressForm.controls.city.enable();
    this.userAddressForm.controls.county.setValue(address.county);
    this.getCities();
    setTimeout(() => {
      this.userAddressForm.controls.city.setValue(address.city);
    }, 1000);
    this.userAddressForm.controls.address.setValue(address.address);

  }
  addNewAddress() {
    console.log(this.userAddressForm.controls.fullName.value)
    console.log(this.userAddressForm.controls.phone.value)
    console.log(this.userAddressForm.controls.county.value)
    console.log(this.userAddressForm.controls.city.value)
    console.log(this.userAddressForm.controls.address.value)
    this.loading= true;
  }
  cancel() {
    this.visible = false;
    this.userAddressForm.controls.fullName.setValue('');
    this.userAddressForm.controls.phone.setValue('');
    this.userAddressForm.controls.county.setValue('');
    this.userAddressForm.controls.city.setValue('');
    this.userAddressForm.controls.address.setValue('');

  }
}