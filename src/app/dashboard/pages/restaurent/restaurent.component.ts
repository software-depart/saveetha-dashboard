import { Component, OnInit } from '@angular/core';
import { ResaturantService } from 'src/app/services/restaurant/resaturant.service';
import { MatDialog } from '@angular/material/dialog'
import { RestaurentFormComponent } from './restaurent-form/restaurent-form.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { FoodcourtService } from 'src/app/services/foodcourt/foodcourt.service'

@Component({
  selector: 'app-restaurent',
  templateUrl: './restaurent.component.html',
  styleUrls: ['./restaurent.component.scss']
})

export class RestaurentComponent implements OnInit {
  restaurants: any;
  foodcourts: any;
  filteredFoodcourts: any;
  isLoading: boolean | undefined;
  location = null
  foodcourt: string = '';
  constructor(private resaturantService: ResaturantService, private dialog: MatDialog, private foodcourtService: FoodcourtService) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.getAllRestaurants();
    this.getAllFoodcourts();
  }

  addRestaurant() {
    const dialogRef = this.dialog.open(RestaurentFormComponent, {
      width: '500px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.location = null;
        this.getAllRestaurants();
      }
    })
  }
  updateRestaurant(restaurant: any): void {
    const dialogRef = this.dialog.open(RestaurentFormComponent, {
      width: '500px',
      disableClose: true,
      data: restaurant
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllRestaurants();
      }
    })
  }

  getAllRestaurants() {
    // const queryString = 'location=Thandalam Campus'
    const queryString = this.createFilterQueryString();
    this.isLoading = true;
    this.resaturantService.getAllRestaurants(queryString).subscribe(res => {
      this.isLoading = false;
      this.restaurants = res.data;
    })
  }
  onApprove(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Approve Restaurant', message: `Are you sure you want to approve ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.approveRestaurant(resaturant._id);
      }
    })
  }

  approveRestaurant(id: any): void {
    this.isLoading = true;
    this.resaturantService.updateRestaurant(id, { isApproved: true }).subscribe(res => {
      this.getAllRestaurants();
    })
  }

  onMakeActive(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Activate Restaurant', message: `Are you sure you want to activate ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activeRestaurant(resaturant._id);
      }
    })
  }

  activeRestaurant(id: any): void {
    this.isLoading = true;
    this.resaturantService.updateRestaurant(id, { isActive: true }).subscribe(res => {
      this.getAllRestaurants();
    })
  }

  onDelete(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Delete Restaurant', message: `Are you sure you want to delete ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteRestaurant(resaturant._id);
      }
    })
  }
  deleteRestaurant(id: string): void {
    this.isLoading = true;
    this.resaturantService.deleteRestaurant(id).subscribe(res => {
      this.getAllRestaurants();
    })
  }

  search(): void {
    this.getAllRestaurants();
  }

  createFilterQueryString() {
    let queryString = '';
    if (this.location) {
      queryString += `${queryString.length > 0 ? '&' : ''}location=${this.location}`
    }
    if (this.foodcourt) {
      queryString += `${queryString.length > 0 ? '&' : ''}foodcourt=${this.foodcourt}`
    }
    return queryString.trim();
  }
  getAllFoodcourts() {
    this.foodcourtService.getAllFoodcourts('').subscribe(res => {
      this.foodcourts = res.data;
      this.filteredFoodcourts = res.data;
    })
  }
  onChangeLocation() {
    this.foodcourt = '';
    if (this.location === '') {
      this.filteredFoodcourts = [...this.foodcourts];
    } else {
      this.filteredFoodcourts = this.foodcourts.filter((item: any) => item.location && item.location === this.location);
    }
  }
}

