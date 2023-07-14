import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

import {Product} from 'src/app/home-page/shared/product.model';
import {ProductsService} from 'src/app/home-page/shared/products.service';

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
  @Output() updatedProduct = new EventEmitter();

  visible = false;
  images: any = [];
  selectedFile!: File;
  message: string = '';
  productsList: any = [];
  categoriesList: any = [];
  uploadedFiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((list: any) => {
      this.productsList = list;
    });
    this.productsService.getCategories().subscribe((list: any) => {
      this.categoriesList = list;
    });
  }

  productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required]],
    categoryId: ['',[Validators.required]],
    description: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    discount: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
    image: [[''], [Validators.required]]
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']?.currentValue) {
      this.visible = changes['show'].currentValue;
    }
    if (this.header === 'Edit product') {
      this.productForm.controls.name.setValue(this.selectedProduct.name);
      let selectedCategory = this.categoriesList.filter((category: any) => category.id === this.selectedProduct?.categoryId);
      this.productForm.controls.categoryId.setValue(selectedCategory.length ? selectedCategory[0].id : null);
      this.productForm.controls.categoryId.disable();
      this.productForm.controls.price.setValue(this.selectedProduct.price.toString());
      this.productForm.controls.description.setValue(this.selectedProduct.description.toString());
      this.productForm.controls.stock.setValue(this.selectedProduct.unitsInStock.toString());
      this.productForm.controls.discount.setValue(this.selectedProduct.discountPercentage.toString());
      this.productForm.controls.image.setValue(this.selectedProduct.imagesName);
      console.log(this.productForm)
    } else if (this.header === 'Add new product') {
      this.productForm.controls.name.setValue('');
      this.productForm.controls.categoryId.setValue('');
      this.productForm.controls.categoryId.enable();
      this.productForm.controls.price.setValue('');
      this.productForm.controls.description.setValue('');
      this.productForm.controls.stock.setValue('');
      this.productForm.controls.discount.setValue('');
    }
  }

  onClose() {
    this.productForm.controls.name.setValue('');
    this.productForm.controls.price.setValue('');
    this.productForm.controls.categoryId.setValue('');
    this.productForm.controls.description.setValue('');
    this.productForm.controls.stock.setValue('');
    this.productForm.controls.discount.setValue('');
    this.visible = false;
    this.closeEmitter.emit(this.visible);
  }

  onSubmit() {
    const product: Product = {
      name: this.productForm.controls.name.value,
      price: +this.productForm.controls.price.value,
      description: this.productForm.controls.description.value,
      categoryId: +this.productForm.controls.categoryId.value,
      unitsInStock: +this.productForm.controls.stock.value,
      discountPercentage: +this.productForm.controls.discount.value,
      imagesName: this.productForm.controls.image.value
    } as unknown as Product;


    const formData = new FormData();
    formData.append('name', String(this.productForm.controls.name.value));
    formData.append('price', String(this.productForm.controls.price.value));
    formData.append('description', String(this.productForm.controls.description.value));
    formData.append('categoryId', String(this.productForm.controls.categoryId.value));
    formData.append('unitsInStock', String(this.productForm.controls.stock.value));
    formData.append('discountPercentage', String(this.productForm.controls.discount.value));
    formData.append('image', this.selectedFile);
    if (this.header === 'Add new product') {
      this.productsService.sendForm(formData, +this.productForm.controls.categoryId.value)
        .subscribe((res) => this.savedProduct.emit(res));
      this.visible = false;
    } else {
      console.log(product)
      this.productsService
        .updateProduct(product, this.selectedProduct.id)
        .subscribe((res) => {
          console.log(res)
          this.visible = false;
          this.updatedProduct.emit(res);
        });
    }
  }

  onFileChanged(event: any) {
    this.productForm.controls.image.setValue(event.target.files[0]);
  }

  onUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.productsService.saveImage(uploadImageData, this.selectedProduct.id)
      .subscribe();
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
