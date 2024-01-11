import { Component, OnInit } from '@angular/core';
import { FoodcourtService } from 'src/app/services/foodcourt/foodcourt.service';
import { MatDialog } from '@angular/material/dialog'
import { FoodFormComponent } from './food-form/food-form.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';


@Component({
  selector: 'app-food-court',
  templateUrl: './food-court.component.html',
  styleUrls: ['./food-court.component.scss']
})

export class FoodCourtComponent implements OnInit {
  foodcourts: any;
  isLoading: boolean | undefined;
  location: string = '';

  constructor(private foodcourtService: FoodcourtService, private dialog: MatDialog) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.getAllFoodcourts();
  }

  addFoodCourt() {
    const dialogRef = this.dialog.open(FoodFormComponent, {
      width: '500px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.location = '';
        this.getAllFoodcourts();
      }
    })
  }
  updateFoodcourt(foodcourt: any): void {
    const dialogRef = this.dialog.open(FoodFormComponent, {
      width: '500px',
      disableClose: true,
      data: foodcourt
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllFoodcourts();
      }
    })
  }

  getAllFoodcourts() {
    const queryString = this.createFilterQueryString();
    this.isLoading = true;
    this.foodcourtService.getAllFoodcourts(queryString).subscribe(res => {
      this.isLoading = false;
      this.foodcourts = res.data;
    })
  }
  onApprove(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Approve Food court', message: `Are you sure you want to approve ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.approveFoodcourt(resaturant._id);
      }
    })
  }

  approveFoodcourt(id: any): void {
    this.isLoading = true;
    this.foodcourtService.updateFoodcourt(id, { isApproved: true }).subscribe(res => {
      this.getAllFoodcourts();
    })
  }

  onMakeActive(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Activate Food court', message: `Are you sure you want to activate ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activeFoodcourt(resaturant._id);
      }
    })
  }

  activeFoodcourt(id: any): void {
    this.isLoading = true;
    this.foodcourtService.updateFoodcourt(id, { isActive: true }).subscribe(res => {
      this.getAllFoodcourts();
    })
  }

  onDelete(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Delete Food court', message: `Are you sure you want to delete ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteFoodcourt(resaturant._id);
      }
    })
  }
  deleteFoodcourt(id: string): void {
    this.isLoading = true;
    this.foodcourtService.deleteFoodcourt(id).subscribe(res => {
      this.getAllFoodcourts();
    })
  }

  search(): void {
    this.getAllFoodcourts();
  }

  createFilterQueryString() {
    let queryString = '';
    if (this.location) {
      queryString += `${queryString.length > 0 ? '&' : ''} location=${this.location}`
    }
    return queryString.trim();
  }

}
