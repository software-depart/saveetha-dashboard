import { Component, OnInit } from '@angular/core';
import { ResaturantService } from 'src/app/services/restaurant/resaturant.service';
import { MatDialog } from '@angular/material/dialog'
import { RestaurentFormComponent } from './restaurent-form/restaurent-form.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { FoodcourtService } from 'src/app/services/foodcourt/foodcourt.service'
import { UserService } from 'src/app/services/user/user.service'
import { CampusService } from 'src/app/services/campus/campus.service'

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
  allRestaurants: any = [];
  campuses: any = [];
  constructor(
    private resaturantService: ResaturantService,
    private dialog: MatDialog,
    private foodcourtService: FoodcourtService,
    private userService: UserService,
    private campusService: CampusService) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.userService.resetSearch.next('')
    this.userService.searchUpdated.subscribe(query => {
      if (this.allRestaurants.length > 0) {
        this.restaurants = this.userService.globalSearch(query.toLowerCase(), this.allRestaurants, ['name', 'foodcourt.name', 'location', 'food_type', 'address']);
      }
    })
    this.getAllRestaurants();
    this.getAllFoodcourts();
    this.getAllCampuses();
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
      this.allRestaurants = res.data;
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
  getAllCampuses() {
    this.campusService.getAllCampuses('').subscribe(res => {
      this.campuses = res.data;
    })
  }
}

