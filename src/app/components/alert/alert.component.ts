import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  title: string = ''
  message: string = ''
  warning: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlertComponent>,
  ) { }

  ngOnInit() {
    if (this.data) {
      this.title = this.data.title;
      this.message = this.data.message;
      this.warning = this.data.warning || false;
    }
  }

  doOk(doAction: boolean) {
    this.closeModal(doAction)
  }

  closeModal(reload: boolean): void {
    this.dialogRef.close(reload);
  }

}
