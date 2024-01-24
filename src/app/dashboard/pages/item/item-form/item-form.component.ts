import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ResaturantService } from 'src/app/services/restaurant/resaturant.service';
import { ItemService } from 'src/app/services/item/item.service'
import { SubcategoryService } from 'src/app/services/subcategory/subcategory.service'

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  foodcourts: any;
  model: any = {
    isApproved: false,
    isActive: false,
    restaurantId: '',
    name: '',
    unit: '',
    quantity: '',
    subcategoryID: '',
    amount: ''
  }
  action: string = 'Create'
  title: string = 'Create Item'
  mode: string = 'create'
  errorMessage: string = '';
  restaurants: any = [];
  subcategories: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ItemFormComponent>,
    private resaturantService: ResaturantService,
    private subcategoryService: SubcategoryService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.getAllRestaurants()
    this.getAllSubCategories()
    if (this.data) {
      this.mode = 'update';
      this.model = {
        isApproved: this.data.isApproved,
        isActive: this.data.isActive,
        restaurantId: this.data.restaurantId._id,
        name: this.data.name,
        unit: this.data.unit,
        quantity: Number(this.data.quantity),
        subcategoryID: this.data.subcategoryID._id,
        amount: Number(this.data.amount)
      }
      this.action = 'Update'
      this.title = 'Update Item'
    }
  }

  onSubmit() {
    if (!this.validModel(this.model)) {
      this.errorMessage = 'Please fill in all the fields.'
      return;
    }
    if (this.mode === 'create') {
      this.itemService.createItem(this.model).subscribe(res => {
        this.closeModal(true)
      }, err => {
        this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
      })
    } else {
      this.itemService.updateItem(this.data._id, this.model).subscribe(res => {
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

  getAllRestaurants() {
    this.resaturantService.getAllRestaurants('').subscribe(res => {
      this.restaurants = res.data;
    })
  }
  getAllSubCategories() {
    this.subcategoryService.getAllSubCategories('').subscribe(res => {
      this.subcategories = res.data;
    })
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
