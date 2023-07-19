import {Component, OnInit} from '@angular/core';
import {AdressServiceService} from "../shared/adress-service.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CommonModule} from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';


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
  loading: boolean = false;
  cities: any = [];
  visible: boolean = false;
  header: string = '';
  counties: any = [];
  selectedAddress: any = [];
  loadingDropdown: boolean = false;
  userAddresses: any = [{
    fullName: 'Ion Popescu',
    phone: '0745123456',
    county: 'B',
    city: 'Sector 2',
    address: 'Strada 1'
  },
    {
        fullName: 'Ioana Popescu',
        phone: '0723453456',
        county: 'B',
        city: 'Sector 1',
        address: 'Strada 2'
    }];
  paymentType: string = '';
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
    this.loadingDropdown = true;
    this.visible = true;
    this.loading = true
    this.header = 'Edit address';
    this.selectedAddress = address;
    this.userAddressForm.controls.fullName.setValue(address.fullName);
    this.userAddressForm.controls.phone.setValue(address.phone);
    this.userAddressForm.controls.city.enable();
    this.userAddressForm.controls.county.setValue(address.county);
    this.getCities();
    setTimeout(() => {
      this.userAddressForm.controls.city.setValue(address.city);
      this.loading = false;
      this.loadingDropdown = false;
    }, 1000);
    this.userAddressForm.controls.address.setValue(address.address);

  }
  addNewAddress() {
    this.loading= true;
    this.userAddresses.push({
      fullName: this.userAddressForm.controls.fullName.value,
      phone: this.userAddressForm.controls.phone.value,
      county: this.userAddressForm.controls.county.value,
      city: this.userAddressForm.controls.city.value,
      address: this.userAddressForm.controls.address.value
    })
    this.cancel();
  }
  cancel() {
    this.visible = false;
    this.loading= false;
    this.userAddressForm.controls.fullName.setValue('');
    this.userAddressForm.controls.phone.setValue('');
    this.userAddressForm.controls.county.setValue('');
    this.userAddressForm.controls.city.setValue('');
    this.userAddressForm.controls.address.setValue('');
    this.userAddressForm.controls.city.disable();
  }

  deleteAddress(address: any) {
    this.userAddresses = this.userAddresses.filter((item: any) => item !== address);
  }
}
