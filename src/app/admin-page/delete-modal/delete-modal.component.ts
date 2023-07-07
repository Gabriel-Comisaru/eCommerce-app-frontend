import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  token = '';
  deleteVisible = false;

  constructor(private mockProductsService: MockProductsService) {
  }

  ngOnInit() {
    this.mockProductsService.getToken('admin', 'admin')
      .subscribe(res => this.token = res.token)
  }

  delete(selectedProduct: MockProductDetailed | undefined, event: any) {
    event.stopPropagation();
    this.mockProductsService.delete(selectedProduct!.id, this.token);
    this.deleteEmitter.emit(selectedProduct?.id);
  }

  close() {
    this.deleteVisible = false;
    this.closeEmitter.emit(this.deleteVisible)
  }
}
