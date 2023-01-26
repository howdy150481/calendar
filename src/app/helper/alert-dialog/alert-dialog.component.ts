import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  title:string = ''
  message:string = '';

  constructor(
      public dialogRef: MatDialogRef<AlertDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
