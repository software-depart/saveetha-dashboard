import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CampusService } from 'src/app/services/campus/campus.service';

@Component({
  selector: 'app-campus-form',
  templateUrl: './campus-form.component.html',
  styleUrls: ['./campus-form.component.scss']
})
export class CampusFormComponent implements OnInit {

  model: any = {
    isApproved: false,
    isActive: false,
    name: '',
  }
  action: string = 'Create'
  title: string = 'Create Campus'
  mode: string = 'create'
  errorMessage: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CampusFormComponent>,
    private campusService: CampusService) { }

  ngOnInit(): void {
    if (this.data) {
      this.mode = 'update';
      this.model = {
        isApproved: this.data.isApproved,
        isActive: this.data.isActive,
        name: this.data.name,
      }
      this.action = 'Update'
      this.title = 'Update Campus'
    }
  }

  onSubmit() {
    if (!this.validModel(this.model)) {
      this.errorMessage = 'Please fill in all the fields.'
      return;
    }
    if (this.mode === 'create') {
      this.campusService.createCampus(this.model).subscribe(res => {
        this.closeModal(true)
      }, err => {
        this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
      })
    } else {
      this.campusService.updateCampus(this.data._id, this.model).subscribe(res => {
        this.closeModal(true)
      }, err => {
        this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
      })
    }
  }
  validModel(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === '') {
          return false;
        }
      }
    }
    return true;
  }
  closeModal(reload: boolean): void {
    this.dialogRef.close(reload);
  }
}
