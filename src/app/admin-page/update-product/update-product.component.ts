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
import {Category} from "../../home-page/shared/category.model";
import {UUID} from "angular2-uuid";


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [MessageService],
})
export class UpdateProductComponent implements OnInit {
  @ViewChild('uploadComponent') uploadComponent!: ElementRef
  @Input() selectedProduct?: Product;
  @Input() show: boolean = false;
  @Input() header: string = '';
  @Input() editModalFlag?: boolean;
  @Output() closeEmitter = new EventEmitter();
  @Output() savedProduct = new EventEmitter();
  @Output() updatedProduct = new EventEmitter();
  loading: boolean = false;
  product?: Product;
  imagesList: string[] = [];
  responsiveOptions: any[] = [];
  visible = false;
  categoriesList: Category[] = [];
  images: any = [];
  ifPressed: boolean = false;
  spinnerLoading: boolean = false;
  showImageError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.productsService.getCategories().subscribe((list: any) => {
      this.categoriesList = list;
    });
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

  productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required,
      Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.min(1), Validators.pattern('^[1-9][.0-9]*$')]],
    categoryId: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stock: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(0)]],
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
    this.showImageError = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']?.currentValue) {
      this.visible = changes['show'].currentValue;
    }
    if (this.editModalFlag) {
      this.productForm.controls.name.setValue(this.selectedProduct!.name);
      this.productForm.controls.categoryId.setValue(this.selectedProduct!.categoryName);
      this.productForm.controls.categoryId.disable();
      this.productForm.controls.price.setValue(this.selectedProduct!.price.toString());
      this.productForm.controls.description.setValue(this.selectedProduct!.description.toString());
      this.productForm.controls.stock.setValue(this.selectedProduct!.unitsInStock.toString());
      this.productForm.controls.discount.setValue(this.selectedProduct!.discountPercentage.toString());
      this.imagesList = [...this.selectedProduct!.imagesName];
    } else if (!this.editModalFlag) {
      this.resetFormValues()
      this.productForm.controls.categoryId.enable();
    }
  }

  onClose(uploadComponent: any) {
    this.resetFormValues()
    this.closeEmitter.emit(this.visible);
    uploadComponent.clear();
    this.visible = false;
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
    if (!this.editModalFlag) {
      if (!this.productForm.controls.imagesName.value) {
        this.showImageError = true;
        return;
      }
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
        .updateProduct(product, this.selectedProduct!.id)
        .subscribe((res) => {
          this.loading = false;
          this.visible = false;
          this.updatedProduct.emit(res);
        });
    }
  }

  onFileChanged(event: any, uploadComponent: any, id: number | undefined) {
    this.showImageError = false;
    if (!this.editModalFlag) {
      this.productForm.controls.imagesName.setValue(new File([event.currentFiles[0]], UUID.UUID(), {type: 'image/png'}) as any);
    } else if (this.editModalFlag) {
      this.uploadImage(id, event, uploadComponent)
    }
  }

  uploadImage(id: number | undefined, event: any, uploadComponent: any) {
    this.spinnerLoading = true;
    const formData = new FormData();
    formData.append('imageFile',new File([event.currentFiles[0]], UUID.UUID(), {type: 'image/png'}))
    this.productsService.saveImage(formData, id!)
      .subscribe((res) => {
          this.spinnerLoading = false;
          this.updatedProduct.emit(res);
          uploadComponent.clear();
        },
        () => {
          this.spinnerLoading = false
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Image name already exists'
          })
          uploadComponent.clear();
        }
      )
  }

  deleteImage(image: any) {
    this.spinnerLoading = true;
    this.ifPressed = true;
    this.productsService.deleteImage(image)
      .subscribe(() => {
        this.spinnerLoading = false;
        this.ifPressed = false;
        this.updatedProduct.emit({
          ...this.selectedProduct, imagesName: this.imagesList.filter((item: any) => {
            return item != image
          })
        });
      })
  }
}
