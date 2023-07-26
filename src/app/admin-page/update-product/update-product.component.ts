import {
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Product} from 'src/app/home-page/shared/product.model';
import {ProductsService} from 'src/app/home-page/shared/products.service';
import { BASE_URL_API } from 'src/app/settings';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [MessageService],
})
export class UpdateProductComponent implements OnInit {
  @ViewChild('uploadComponent') uploadComponent!: ElementRef
  @Input() selectedProduct!: Product;
  @Input() show: any;
  @Input() header: any;
  @Input() token: any;
  @Output() closeEmitter = new EventEmitter();
  product: any;
  @Output() savedProduct = new EventEmitter();
  @Output() updatedProduct = new EventEmitter();
  loading: boolean = false;
  imagesList: any = [];
  i: any = 0;
  visible = false;
  categoriesList: any = [];
  baseUrlApi = BASE_URL_API;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
  }

  ngOnInit() {
    this.i = 0;
    this.productsService.getCategories().subscribe((list: any) => {
      this.categoriesList = list;
    });
  }

  productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required,
      Validators.minLength(3)]],
    price: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    discount: ['', [Validators.pattern('^[0-9]*$'),
      Validators.max(100),
      Validators.min(0),
      Validators.required]],
    imagesName: ['']
  });

  resetFormValues() {
    this.productForm.controls.name.reset()
    this.productForm.controls.categoryId.reset()
    this.productForm.controls.price.reset()
    this.productForm.controls.description.reset()
    this.productForm.controls.stock.reset()
    this.productForm.controls.discount.reset()
    this.productForm.controls.imagesName.reset()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']?.currentValue) {
      this.visible = changes['show'].currentValue;
    }
    if (this.header === this.selectedProduct.name) {
      this.productForm.controls.name.setValue(this.selectedProduct.name);
      let selectedCategory = this.categoriesList.filter((category: any) => category.id === this.selectedProduct?.categoryId);
      this.productForm.controls.categoryId.setValue(selectedCategory.length ? selectedCategory[0].id : null);
      this.productForm.controls.categoryId.disable();
      this.productForm.controls.price.setValue(this.selectedProduct.price.toString());
      this.productForm.controls.description.setValue(this.selectedProduct.description.toString());
      this.productForm.controls.stock.setValue(this.selectedProduct.unitsInStock.toString());
      this.productForm.controls.discount.setValue(this.selectedProduct.discountPercentage.toString());
      this.productForm.controls.imagesName.setValue(this.selectedProduct.imagesName[0])
      this.imagesList = [...this.selectedProduct.imagesName];
      this.i = 0;
    } else if (this.header != this.selectedProduct.name) {
      this.resetFormValues()
      this.productForm.controls.categoryId.enable();
    }
  }

  onClose() {
    this.resetFormValues()
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
    } as Product;

    const formData = new FormData();
    formData.append('name', String(this.productForm.controls.name.value));
    formData.append('price', String(this.productForm.controls.price.value));
    formData.append('description', String(this.productForm.controls.description.value));
    formData.append('categoryId', String(this.productForm.controls.categoryId.value));
    formData.append('unitsInStock', String(this.productForm.controls.stock.value));
    formData.append('discountPercentage', String(this.productForm.controls.discount.value));
    formData.append('image', this.productForm.controls.imagesName.value);
    if (this.header != this.selectedProduct.name) {
      this.loading = true;
      this.productsService.sendForm(formData, +this.productForm.controls.categoryId.value)
        .subscribe((res) => {
          this.loading = false;
          this.visible = false;
          this.savedProduct.emit(res)
        });
    } else {
      this.loading = true;
      this.productsService
        .updateProduct(product, this.selectedProduct.id)
        .subscribe((res) => {
          this.loading = false;
          this.visible = false;
          this.updatedProduct.emit(res);
        });
    }
  }

  onFileChanged(event: any) {
    this.productForm.controls.imagesName.setValue(event.currentFiles[0]);
  }

  close() {
    this.i = 0;
    this.visible = false;
    this.closeEmitter.emit(this.visible);
  }

  uploadImage(id: number, event: any, uploadComponent: any) {
    const formData = new FormData();
    formData.append('imageFile', event.currentFiles[this.i])
    console.log(event.currentFiles[this.i])
    this.productsService.saveImage(formData, id)
      .subscribe((res) => {
        this.updatedProduct.emit(res);
        this.i++;
        console.log(this.uploadComponent)
        uploadComponent.clear();
      })

  }

  deleteImage(image: any) {
    this.productsService.deleteImage(image)
      .subscribe((res) => {
        this.updatedProduct.emit({
          ...this.selectedProduct, imagesName: this.imagesList.filter((item: any) => {
            return item.name != image.name
          })
        });
      })
  }
}
