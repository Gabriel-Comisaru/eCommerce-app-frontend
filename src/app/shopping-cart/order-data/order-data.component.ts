import { Component, OnInit } from '@angular/core';
import { AdressServiceService } from '../shared/adress-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from '../shared/basket.service';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/home-page/shared/products.service';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css'],
})
export class OrderDataComponent implements OnInit {
  constructor(
    private addressService: AdressServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private basketService: BasketService,
    private router: Router,
    private messageService: MessageService,
    private productsService: ProductsService
  ) {}

  userAddressForm = this.fb.group({
    id: [''],
    fullName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    phone: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
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
  selectedAddress: number = 0;
  orderId: number = 0;

  userAddresses: any = [
    {
      id: 0,
      fullName: 'Ion Popescu',
      phone: '0745123456',
      county: 'B',
      city: 'Sector 2',
      address: 'Strada 1',
    },
    {
      id: 1,
      fullName: 'Ioana Popescu',
      phone: '0723453456',
      county: 'B',
      city: 'Sector 1',
      address: 'Strada 2',
    },
  ];
  paymentType: string = 'cash';

  ngOnInit(): void {
    this.getCounties();
    this.userAddressForm.controls.city.disable();
    console.log(this.route.snapshot.queryParams['ids']);
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
        console.log(list);
      });
  }

  showDialog() {
    this.visible = true;
    this.header = 'Add new address';
  }

  editAddress(address: any) {
    this.loadingDropdown = true;
    this.visible = true;
    this.loading = true;
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
    this.loading = true;
    this.userAddresses.push({
      id: this.userAddresses.length,
      fullName: this.userAddressForm.controls.fullName.value,
      phone: this.userAddressForm.controls.phone.value,
      county: this.userAddressForm.controls.county.value,
      city: this.userAddressForm.controls.city.value,
      address: this.userAddressForm.controls.address.value,
    });
    this.cancel();
  }

  cancel() {
    this.visible = false;
    this.loading = false;
    this.userAddressForm.controls.fullName.setValue('');
    this.userAddressForm.controls.phone.setValue('');
    this.userAddressForm.controls.county.setValue('');
    this.userAddressForm.controls.city.setValue('');
    this.userAddressForm.controls.address.setValue('');
    this.userAddressForm.controls.city.disable();
  }

  deleteAddress(address: any) {
    this.userAddresses = this.userAddresses.filter(
      (item: any) => item !== address
    );
  }

  //WORK IN PROGRESS
  //Add Payment Method
  //Add Delivery Address Id
  finishOrder() {
    this.basketService
      .finishOrder(this.route.snapshot.queryParams['ids'], 'PLACED')
      .subscribe(
        (response: any) => {
          this.productsService.shoppingCartObservable.next({
            basketOrderItems: [],
          });
          console.log(response, 'response-=-=-=-=-=-=');
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
