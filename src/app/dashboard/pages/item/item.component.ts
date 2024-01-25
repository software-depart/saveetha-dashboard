import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory/subcategory.service';
import { MatDialog } from '@angular/material/dialog'
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ItemService } from 'src/app/services/item/item.service';
import { ResaturantService } from 'src/app/services/restaurant/resaturant.service';
import { ItemFormComponent } from './item-form/item-form.component'
import { UserService } from 'src/app/services/user/user.service'
import { CampusService } from 'src/app/services/campus/campus.service'
import { ImportItemsComponent } from './import-items/import-items.component';

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
  location = null
  filteredRestaurants: any = []
  allItems: any = [];
  campuses: any = [];
  constructor(
    private subcategoryService: SubcategoryService,
    private dialog: MatDialog,
    private itemService: ItemService,
    private resaturantService: ResaturantService,
    private userService: UserService,
    private campusService: CampusService) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.userService.resetSearch.next('')
    this.userService.searchUpdated.subscribe(query => {
      if (this.allItems.length > 0) {
        this.items = this.userService.globalSearch(query.toLowerCase(), this.allItems,
          ['name', 'quantity', 'unit', 'amount', 'restaurantId?.name', 'subcategoryID?.name', 'createdBy.firstName', 'updatedBy.firstName']);
      }
    })
    this.getRestaurants();
    this.getSubcategories();
    this.getAllItems();
    this.getAllCampuses();
  }

  getAllItems() {
    const queryString = this.createFilterQueryString();
    this.isLoading = true;
    this.itemService.getAllItems(queryString).subscribe(res => {
      this.isLoading = false;
      this.items = res.data;
      this.allItems = res.data;
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
      this.filteredRestaurants = res.data;
    })
  }
  onChangeLocation() {
    this.restaurant = '';
    if (this.location === '') {
      this.filteredRestaurants = [...this.restaurants];
    } else {
      this.filteredRestaurants = this.restaurants.filter((item: any) => item.location && item.location === this.location);
    }
  }
  addItem() {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '800px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.location = null;
        this.restaurant = '';
        this.subCategory = '';
        this.getAllItems();
      }
    })
  }
  updateItem(item: any): void {
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '800px',
      disableClose: true,
      data: item
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllItems();
      }
    })
  }
  onDelete(item: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Delete Item', message: `Are you sure you want to delete ${item.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteItem(item._id);
      }
    })
  }
  deleteItem(id: string): void {
    this.isLoading = true;
    this.itemService.deleteItem(id).subscribe(res => {
      this.getAllItems();
    })
  }
  getAllCampuses() {
    this.campusService.getAllCampuses('').subscribe(res => {
      this.campuses = res.data;
    })
  }
  importItems() {
    const dialogRef = this.dialog.open(ImportItemsComponent, {
      width: '500',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllItems();
      }
    })
  }
}

