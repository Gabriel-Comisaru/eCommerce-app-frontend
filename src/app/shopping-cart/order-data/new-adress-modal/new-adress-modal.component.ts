import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-new-adress-modal',
  templateUrl: './new-adress-modal.component.html',
  styleUrls: ['./new-adress-modal.component.css']
})
export class NewAdressModalComponent {
@Input() header: any;
@Input() show: any;
visible = false;
  onClose() {

  }
}
