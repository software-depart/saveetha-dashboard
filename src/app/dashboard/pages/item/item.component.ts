import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory/subcategory.service';
import { MatDialog } from '@angular/material/dialog'
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ItemService } from 'src/app/services/item/item.service';
import { ResaturantService } from 'src/app/services/restaurant/resaturant.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {
  items: any;
  isLoading: boolean | undefined;
  subCategory: string = '';
  restaurant: string = '';
  restaurants: any = [];
  subcategories: any = [];

  constructor(
    private subcategoryService: SubcategoryService,
    private dialog: MatDialog,
    private itemService: ItemService,
    private resaturantService: ResaturantService) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.getRestaurants();
    this.getSubcategories();
    this.getAllItems();
  }

  getAllItems() {
    const queryString = this.createFilterQueryString();
    this.isLoading = true;
    this.itemService.getAllItems(queryString).subscribe(res => {
      this.isLoading = false;
      this.items = res.data;
    })
  }
  onApprove(subCategory: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Approve Item', message: `Are you sure you want to approve ${subCategory.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.approveItem(subCategory._id);
      }
    })
  }

  approveItem(id: any): void {
    this.isLoading = true;
    this.itemService.updateItem(id, { isApproved: true }).subscribe(res => {
      this.getAllItems();
    })
  }

  onMakeActive(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Activate Item', message: `Are you sure you want to activate ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activateItem(resaturant._id);
      }
    })
  }

  activateItem(id: any): void {
    this.isLoading = true;
    this.itemService.updateItem(id, { isActive: true }).subscribe(res => {
      this.getAllItems();
    })
  }

  search(): void {
    this.getAllItems();
  }

  createFilterQueryString() {
    let queryString = '';
    if (this.subCategory) {
      queryString += `${queryString.length > 0 ? '&' : ''}subcategoryID=${this.subCategory}`
    }
    if (this.restaurant) {
      queryString += `${queryString.length > 0 ? '&' : ''}restaurantId=${this.restaurant}`
    }
    return queryString.trim();
  }
  getSubcategories() {
    this.subcategoryService.getAllSubCategories('').subscribe(res => {
      this.subcategories = res.data;
    })
  }
  getRestaurants() {
    this.resaturantService.getAllRestaurants('').subscribe(res => {
      this.restaurants = res.data;
    })
  }

}

