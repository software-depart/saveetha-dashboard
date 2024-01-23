import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ResaturantService } from 'src/app/services/restaurant/resaturant.service';
import { FoodcourtService } from 'src/app/services/foodcourt/foodcourt.service';
import { CampusService } from 'src/app/services/campus/campus.service'

@Component({
  selector: 'app-restaurent-form',
  templateUrl: './restaurent-form.component.html',
  styleUrls: ['./restaurent-form.component.scss']
})
export class RestaurentFormComponent implements OnInit {
  foodcourts: any;
  model: any = {
    isApproved: false,
    isActive: false,
    location: '',
    name: '',
    food_type: '',
    address: '',
    foodcourt: ''
  }
  action: string = 'Create'
  title: string = 'Create Restaurant'
  mode: string = 'create'
  errorMessage: string = '';
  campuses: any = [];
  filteredFoodcourts: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RestaurentFormComponent>,
    private resaturantService: ResaturantService,
    private foodcourtService: FoodcourtService,
    private campusService: CampusService) { }

  ngOnInit(): void {
    if (this.data) {
      this.mode = 'update';
      this.model = {
        isApproved: this.data.isApproved,
        isActive: this.data.isActive,
        location: this.data.location,
        name: this.data.name,
        food_type: this.data.food_type,
        address: this.data.address,
        foodcourt: this.data.foodcourt._id
      }
      this.action = 'Update'
      this.title = 'Update Restaurant'
    }
    this.getAllFoodcourts()
    this.getAllCampuses();
  }

  onSubmit() {
    if (!this.validModel(this.model)) {
      this.errorMessage = 'Please fill in all the fields.'
      return;
    }
    if (this.mode === 'create') {
      this.resaturantService.createRestaurant(this.model).subscribe(res => {
        this.closeModal(true)
      }, err => {
        this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
      })
    } else {
      this.resaturantService.updateRestaurant(this.data._id, this.model).subscribe(res => {
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

  getAllFoodcourts() {
    this.foodcourtService.getAllFoodcourts('').subscribe(res => {
      this.foodcourts = res.data;
      this.filteredFoodcourts = res.data
      if (this.mode === 'update') {
        this.onChangeLocation();
        this.model.foodcourt = this.data.foodcourt._id
      }
    })
  }
  getAllCampuses() {
    this.campusService.getAllCampuses('').subscribe(res => {
      this.campuses = res.data;
    })
  }
  onChangeLocation() {
    this.model.foodcourt = '';
    if (this.model.location === '') {
      this.filteredFoodcourts = [...this.foodcourts];
    } else {
      this.filteredFoodcourts = this.foodcourts.filter((item: any) => item.location && item.location === this.model.location);
    }

  }
}
