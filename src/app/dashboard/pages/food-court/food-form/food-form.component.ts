import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FoodcourtService } from 'src/app/services/foodcourt/foodcourt.service';
import { CampusService } from 'src/app/services/campus/campus.service'

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.scss']
})
export class FoodFormComponent implements OnInit {

  model: any = {
    isApproved: false,
    isActive: false,
    name: '',
    restaurantsCount: '',
    location: ''
  }
  action: string = 'Create'
  title: string = 'Create Food court'
  mode: string = 'create'
  errorMessage: string = '';
  campuses: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FoodFormComponent>,
    private foodcourtService: FoodcourtService,
    private campusService: CampusService) { }

  ngOnInit(): void {
    this.getAllCampuses();
    if (this.data) {
      this.mode = 'update';
      this.model = {
        isApproved: this.data.isApproved,
        isActive: this.data.isActive,
        name: this.data.name,
        restaurantsCount: this.data.restaurantsCount,
        location: this.data.location
      }
      this.action = 'Update'
      this.title = 'Update Food court'
    }
  }

  onSubmit() {
    if (!this.validModel(this.model)) {
      this.errorMessage = 'Please fill in all the fields.'
      return;
    }
    if (this.mode === 'create') {
      this.foodcourtService.createFoodcourt(this.model).subscribe(res => {
        this.closeModal(true)
      }, err => {
        this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
      })
    } else {
      this.foodcourtService.updateFoodcourt(this.data._id, this.model).subscribe(res => {
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
  getAllCampuses() {
    this.campusService.getAllCampuses('').subscribe(res => {
      this.campuses = res.data;
    })
  }
  validFoodcourt(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value + String.fromCharCode(charCode);
    if (!/^\d+$/.test(inputValue) || Number(inputValue) < 1 || Number(inputValue) > 99) {
      return false;
    }
    return true;
  }
  validName(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value + String.fromCharCode(charCode);
    if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
      return false;
    }
    return true;
  }
}
