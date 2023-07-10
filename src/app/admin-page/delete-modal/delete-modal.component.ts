import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {MockProductModel} from "../../product-categories/shared/mock-product.model";
import {ProductsService} from "../../home-page/shared/products.service";


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Output() deleteEmitter = new EventEmitter();
  @Output() closeEmitter = new EventEmitter();
  @Input() selectedProduct?: MockProductModel;
  @Input() header: any;
  @Input() deleteV: any;
  @Input() tokenDelete: any;
  deleteVisible = false;

  constructor(private mockProductsService: ProductsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['deleteV'].currentValue)
    this.deleteVisible = changes['deleteV'].currentValue;
  }

  delete(selectedProduct: any) {
    console.log(this.tokenDelete)
    this.mockProductsService.delete(selectedProduct!.id)
      .subscribe();
    this.deleteEmitter.emit(selectedProduct?.id);

  }

  close() {
    this.deleteVisible = false;
    this.closeEmitter.emit(this.deleteVisible)
  }
}
