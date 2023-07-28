import {Component, OnInit} from '@angular/core';
import {AdressServiceService} from '../shared/adress-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ActivatedRoute, Router} from '@angular/router';
import {BasketService} from '../shared/basket.service';
import {MessageService} from 'primeng/api';
import {ProductsService} from 'src/app/home-page/shared/products.service';
import {UserAddress} from "../../models/user-address.model";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css'],
})
export class OrderDataComponent implements OnInit {
  loggedInUser: User = JSON.parse(
    localStorage.getItem('currentUser') || '{}'
  );

  constructor(
    private addressService: AdressServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private basketService: BasketService,
    private router: Router,
    private messageService: MessageService,
    private productsService: ProductsService
  ) {
  }

  userAddressForm = this.fb.group({
    id: [''],
    firstName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    phone: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
    county: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
  });

  loading: boolean = false;
  cities: any = [];
  visible: boolean = false;
  header: string = '';
  counties: any = [];
  loadingDropdown: boolean = false;
  selectedAddress!: UserAddress;
  orderId: number = 0;

  userAddresses: any = [
    {
      id: 0,
      firstName: 'Ion',
      lastName: 'Popescu',
      phone: '0745123456',
      county: 'B',
      city: 'Sector 2',
      address: 'Strada 1',
    },
    {
      id: 1,
      firstName: 'Ioana',
      lastName: 'Popescu',
      phone: '0723453456',
      county: 'B',
      city: 'Sector 1',
      address: 'Strada 2',
    },
  ];
  paymentType: string = 'cash';

  ngOnInit(): void {
  this.loadData();
  }

  loadData() {
    this.getCounties();
    this.userAddressForm.controls.city.disable();
    this.addressService.getUserAddresses(this.loggedInUser.id!).subscribe(addresses => {
      this.userAddresses = addresses;
    });
  }

  postAddress() {
      const address: UserAddress = {
        first_name: String(this.userAddressForm.controls.firstName.value),
        last_name: String(this.userAddressForm.controls.lastName.value),
        phone_number: String(this.userAddressForm.controls.phone.value),
        address: String(this.userAddressForm.controls.address.value),
        county: String(this.userAddressForm.controls.county.value),
        city: String(this.userAddressForm.controls.city.value)
      }

      if (this.header === 'Add new address') {
        this.addressService.setAddress(address);
        this.userAddresses.push(address);
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
    this.loading = false;
    this.userAddressForm.controls.firstName.setValue('');
    this.userAddressForm.controls.lastName.setValue('');
    this.userAddressForm.controls.phone.setValue('');
    this.userAddressForm.controls.county.setValue('');
    this.userAddressForm.controls.city.setValue('');
    this.userAddressForm.controls.address.setValue('');
    this.userAddressForm.controls.city.disable();
  }

  deleteAddress(address: any) {
    this.addressService.deleteAddress(address.id).subscribe(() =>{
      this.addressService.getUserAddresses(this.loggedInUser.id!).subscribe(addresses => {
        this.userAddresses = addresses;
      });
    });

  }


  finishOrder() {
    this.basketService
      .finishOrder(this.route.snapshot.queryParams['ids'], 'PLACED')
      .subscribe(
        (response: any) => {
          this.productsService.shoppingCartObservable.next({
            basketOrderItems: [],
          });
          this.orderId = response.id;
          this.router.navigate(['/']);

          this.showSuccessMessage(
            response.deliveryPrice,
            response.orderItems.length
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  showSuccessMessage(totalPrice: number, estimatedDeliveryDate: number) {
    const message = `Order placed successfully!          Total price: ${totalPrice}, Number of Products: ${estimatedDeliveryDate}`;

    this.messageService.add({
      severity: 'success',
      summary: 'Order Placed',
      detail: message,
      life: 6000, // adik six sekunde
    });
  }
}
