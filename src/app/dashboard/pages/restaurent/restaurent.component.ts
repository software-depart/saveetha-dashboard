import { Component, OnInit } from '@angular/core';
import { ResaturantService } from 'src/app/services/restaurant/resaturant.service';
import { MatDialog } from '@angular/material/dialog'
import { RestaurentFormComponent } from './restaurent-form/restaurent-form.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';


@Component({
  selector: 'app-restaurent',
  templateUrl: './restaurent.component.html',
  styleUrls: ['./restaurent.component.scss']
})

export class RestaurentComponent implements OnInit {
  restaurants: any;
  isLoading: boolean | undefined;
  constructor(private resaturantService: ResaturantService, private dialog: MatDialog) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  addRestaurant() {
    const dialogRef = this.dialog.open(RestaurentFormComponent, {
      width: '500px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
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
    this.isLoading = true;
    this.resaturantService.getAllRestaurants().subscribe(res => {
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
    this.resaturantService.updateRestaurant(id, { isApproved: true }).subscribe(res => {
      this.getAllRestaurants();
    })
  }

  onMakeActive(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Active Restaurant', message: `Are you sure you want to active ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activeRestaurant(resaturant._id);
      }
    })
  }

  activeRestaurant(id: any): void {
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
    
  }
}

