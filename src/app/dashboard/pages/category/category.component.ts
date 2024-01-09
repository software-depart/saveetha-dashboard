import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { MatDialog } from '@angular/material/dialog'
import { CategoryFormComponent } from './category-form/category-form.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  categories: any;
  isLoading: boolean | undefined;
  location: string = '';

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  addCategory() {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '500px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.location = '';
        this.getAllCategories();
      }
    })
  }
  updateCategory(category: any): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '500px',
      disableClose: true,
      data: category
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllCategories();
      }
    })
  }

  getAllCategories() {
    const queryString = this.createFilterQueryString();
    this.isLoading = true;
    this.categoryService.getAllCategories(queryString).subscribe(res => {
      this.isLoading = false;
      this.categories = res.data;
    })
  }
  onApprove(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Approve Category', message: `Are you sure you want to approve ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.approveCategory(resaturant._id);
      }
    })
  }

  approveCategory(id: any): void {
    this.categoryService.updateCategory(id, { isApproved: true }).subscribe(res => {
      this.getAllCategories();
    })
  }

  onMakeActive(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Activate Category', message: `Are you sure you want to activate ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activeCategory(resaturant._id);
      }
    })
  }

  activeCategory(id: any): void {
    this.categoryService.updateCategory(id, { isActive: true }).subscribe(res => {
      this.getAllCategories();
    })
  }

  onDelete(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Delete Category', message: `Are you sure you want to delete ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteCategory(resaturant._id);
      }
    })
  }
  deleteCategory(id: string): void {
    this.isLoading = true;
    this.categoryService.deleteCategory(id).subscribe(res => {
      this.getAllCategories();
    })
  }

  search(): void {
    this.getAllCategories();
  }

  createFilterQueryString() {
    let queryString = '';
    if (this.location) {
      queryString += `${queryString.length > 0 ? '&' : ''} location=${this.location}`
    }
    return queryString.trim();
  }

}