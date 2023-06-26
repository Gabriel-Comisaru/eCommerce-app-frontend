import {Component, Inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: any) {
  }

  closeDialog(response:any) {
    this.dialogRef.close(response)
  }

  ngOnInit(): void {
  }
}

