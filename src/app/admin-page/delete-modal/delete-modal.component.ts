import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {MockProductDetailed} from "../../home-page/shared/mockProduct.model";
import {MockProductsService} from "../../home-page/shared/mock-products.service";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Output() deleteEmitter = new EventEmitter();
  @Output() closeEmitter = new EventEmitter();
  @Input() selectedProduct?: MockProductDetailed;
  @Input() header: any;
  @Input() deleteV: any;
  @Input() tokenDelete: any;
  deleteVisible = false;

  constructor(private mockProductsService: MockProductsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['deleteV'].currentValue)
    this.deleteVisible = changes['deleteV'].currentValue;
  }

  delete(selectedProduct: any) {
    console.log(this.tokenDelete)
    this.mockProductsService.delete(selectedProduct!.id, this.tokenDelete)
      .subscribe();
    this.deleteEmitter.emit(selectedProduct?.id);
  }

  close() {
    this.deleteVisible = false;
    this.closeEmitter.emit(this.deleteVisible)
  }
}
