import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MockProductsService} from "../../home-page/shared/mock-products.service";
import {MockProductDetailed} from "../../home-page/shared/mockProduct.model";
import {MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";

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
  imageURL:string='';
  photos:any=[];
  selectedFile:any=[];
  message: string='';

  constructor(private fb: FormBuilder,
              private mockProduct: MockProductsService,
              private messageService: MessageService,
              private httpClient: HttpClient) {
  }

  newProductForm = this.fb.group({
    name: [''],
    photos:[''],
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
    this.newProductForm.controls.name.setValue('')
    this.newProductForm.controls.photos.setValue(null)
    this.newProductForm.controls.price.setValue(0)
    this.newProductForm.controls.category.setValue('')
    this.newProductForm.controls.description.setValue('')
    this.newProductForm.controls.stock.setValue(0)
    this.photos=[];
    this.selectedFile=[];
  }

  onSubmit() {
    const product: MockProductDetailed = {
      name: this.newProductForm.controls.name.value!,
      price: +this.newProductForm.controls.price.value!,
      photos: this.newProductForm.controls.photos.value,
      description: this.newProductForm.controls.description.value!,
      category: this.newProductForm.controls.category.value!
    } as unknown  as MockProductDetailed
    this.mockProduct.saveMockProducts(product)
      .subscribe(()=>console.log(this.newProductForm.value));
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    // this.photos.push(this.file);
    // this.newProductForm.controls.photos.setValue(this.photos)
    // console.log(this.newProductForm.controls.photos.value)
    // this.newProductForm.patchValue({
    //   photos: file
    // });
    // console.log('asta e this.photos'+this.photos)
    // // this.newProductForm.get('photos')!.updateValueAndValidity()
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imageURL = reader.result as string;
    // }
    // reader.readAsDataURL(file)
    // this.uploadedFiles.push(event);
    // this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    // console.log(this.newProductForm.controls.photos.value);
  }

  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.httpClient.post('http://localhost:4200/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );
  }
}
