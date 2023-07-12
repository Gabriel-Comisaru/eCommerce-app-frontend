import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { Product } from 'src/app/home-page/shared/product.model';
import { ProductsService } from 'src/app/home-page/shared/products.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [MessageService],
})
export class UpdateProductComponent implements OnInit {
  @Input() selectedProduct!: Product;
  @Input() show: any;
  @Input() header: any;
  @Input() token: any;
  @Output() closeEmitter = new EventEmitter();
  product: any;
  @Output() savedProduct = new EventEmitter();

  visible = false;
  images: any = [];
  selectedFile: any = [];
  message: string = '';
  productsList: any = [];
  categoriesList: any = [];
  uploadedFiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((list: any) => {
      this.productsList = list;
    });
    this.productsService.getCategories().subscribe((list: any) => {
      this.categoriesList = list;
    });
  }

  productForm = this.fb.nonNullable.group({
    name: [''],
    price: [0],
    categoryId: [0],
    description: [''],
    stock: [0],
    discount: [0]
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']?.currentValue) {
      this.visible = changes['show'].currentValue;
    }
    if (this.header === 'Edit product') {
      this.productForm.controls.name.setValue(this.selectedProduct.name);
      let selectedCategory = this.categoriesList.filter((category: any) => category.id === this.selectedProduct?.categoryId);
      this.productForm.controls.categoryId.setValue(selectedCategory.length ? selectedCategory[0] : null);
      this.productForm.controls.price.setValue(this.selectedProduct.price);
      this.productForm.controls.description.setValue(this.selectedProduct.description);
      this.productForm.controls.stock.setValue(this.selectedProduct.unitsInStock);
      this.productForm.controls.discount.setValue(this.selectedProduct.discountPercentage);
    } else if (this.header === 'Add new product') {
      this.productForm.controls.name.value;
      this.productForm.controls.categoryId.value;
      this.productForm.controls.price.value;
      this.productForm.controls.description.value;
      this.productForm.controls.stock.value;
      this.productForm.controls.discount.value;
    }
  }

  onClose() {
    this.productForm.controls.name.setValue('');
    this.productForm.controls.price.setValue(0);
    this.productForm.controls.categoryId.setValue(0);
    this.productForm.controls.description.setValue('');
    this.productForm.controls.stock.setValue(0);
    this.productForm.controls.discount.setValue(0);
    this.visible = false;
    this.closeEmitter.emit(this.visible);
  }

  onSubmit() {
    const product: Product = {
      name: this.productForm.controls.name.value,
      price: this.productForm.controls.price.value,
      description: this.productForm.controls.description.value,
      categoryId: this.productForm.controls.categoryId.value,
      unitsInStock: this.productForm.controls.stock.value,
      discountPercentage: this.productForm.controls.discount.value
    } as unknown as Product;
    
    if (this.header === 'Add new product') {
      const formData = new FormData();
      formData.append('name', String(this.productForm.controls.name.value));
      formData.append('price', String(this.productForm.controls.price.value));
      formData.append('description', String(this.productForm.controls.description.value));
      formData.append('categoryId', String(this.productForm.controls.categoryId.value));
      formData.append('unitsInStock', String(this.productForm.controls.stock.value));
      formData.append('discountPercentage', String(this.productForm.controls.discount.value));
      this.productsService.sendForm(formData, this.productForm.controls.categoryId.value);
      this.visible = false;
    } else {
      this.productsService
        .updateProduct(product, this.selectedProduct.id)
        .subscribe(() => {
          this.visible = false;
        });
    }
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    // this.photos.push(this.file);
    // this.productForm.controls.photos.setValue(this.photos)
    // console.log(this.productForm.controls.photos.value)
    // this.productForm.patchValue({
    //   photos: file
    // });
    // console.log('asta e this.photos'+this.photos)
    // // this.productForm.get('photos')!.updateValueAndValidity()
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imageURL = reader.result as string;
    // }
    // reader.readAsDataURL(file)
    // this.uploadedFiles.push(event);
    // this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    // console.log(this.productForm.controls.photos.value);
  }

  onUpload(event: UploadEvent) {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  }

  // onUpload(event: UploadEvent) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }

  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'File Uploaded',
  //     detail: '',
  //   });
  // }

  close() {
    this.visible = false;
    this.closeEmitter.emit(this.visible);
  }
}
