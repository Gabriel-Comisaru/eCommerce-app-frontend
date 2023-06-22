import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MockProductsService} from "../../home-page/shared/mock-products.service";
import {MockProductDetailed} from "../../home-page/shared/mockProduct.model";
import {MessageService} from "primeng/api";

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers: [MessageService]
})
export class UpdateProductComponent {
  @Input() show: any;
  @Input() header: any;
  @Output() closeEmitter = new EventEmitter();
  visible = false;
  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder,
              private mockProduct: MockProductsService,
              private messageService: MessageService) {
  }

  newProductForm = this.fb.group({
    name: [''],
    photo1: [''],
    photo2: [''],
    photo3: [''],
    price: [0],
    category: [''],
    description: [''],
    stock: [0],
  })


  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'].currentValue) {
      this.visible = changes['show'].currentValue;
    }
  }

  onClose(event: any) {
    this.closeEmitter.emit()
  }

  protected readonly onsubmit = onsubmit;

  onSubmit() {
    const photos: string[] = [this.newProductForm.controls.photo1.value!, this.newProductForm.controls.photo2.value!, this.newProductForm.controls.photo3.value!]
    const product: MockProductDetailed = {
      name: this.newProductForm.controls.name.value!,
      photos: photos,
      price: +this.newProductForm.controls.price.value!,
      description: this.newProductForm.controls.description.value!,
      category: this.newProductForm.controls.category.value!
    } as MockProductDetailed
    this.mockProduct.saveMockProducts(product)
      .subscribe();
  }

  onUpload(event: any) {
    this.uploadedFiles.push(event);
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    console.log(event.url);
  }
}
