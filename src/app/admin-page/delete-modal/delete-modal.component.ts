import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {Product} from 'src/app/home-page/shared/product.model';
import {ProductsService} from 'src/app/home-page/shared/products.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  @Output() deleteEmitter = new EventEmitter();
  @Output() closeEmitter = new EventEmitter();
  @Input() selectedProduct ?: Product;
  @Input() header: any;
  @Input() deleteVisible: any;
  @Input() tokenDelete: any;

  constructor() {
  }


  delete(selectedProduct: any) {
    this.deleteVisible = false;
    this.deleteEmitter.emit(selectedProduct.id);
  }

  close() {
    this.deleteVisible = false;
    this.closeEmitter.emit(this.deleteVisible);
  }
}
