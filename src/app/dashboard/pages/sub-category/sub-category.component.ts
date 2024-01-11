import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory/subcategory.service';
import { MatDialog } from '@angular/material/dialog'
import { SubCategoryFormComponent } from './sub-category-form/sub-category-form.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})

export class SubCategoryComponent implements OnInit {
  subCategories: any;
  isLoading: boolean | undefined;
  category: string = '';
  categories: any = [];
  constructor(
    private subcategoryService: SubcategoryService,
    private dialog: MatDialog,
    private categoryService: CategoryService) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.getcategories();
    this.getAllSubCategories();
  }

  addSubCategory() {
    const dialogRef = this.dialog.open(SubCategoryFormComponent, {
      width: '500px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.category = '';
        this.getAllSubCategories();
      }
    })
  }
  updateSubCategory(subCategory: any): void {
    const dialogRef = this.dialog.open(SubCategoryFormComponent, {
      width: '500px',
      disableClose: true,
      data: subCategory
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllSubCategories();
      }
    })
  }

  getAllSubCategories() {
    // const queryString = 'location=Thandalam Campus'
    const queryString = this.createFilterQueryString();
    this.isLoading = true;
    this.subcategoryService.getAllSubCategories(queryString).subscribe(res => {
      this.isLoading = false;
      this.subCategories = res.data;
    })
  }
  onApprove(subCategory: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Approve Sub Category', message: `Are you sure you want to approve ${subCategory.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.approveSubcategory(subCategory._id);
      }
    })
  }

  approveSubcategory(id: any): void {
    this.isLoading = true;
    this.subcategoryService.updateSubCategory(id, { isApproved: true }).subscribe(res => {
      this.getAllSubCategories();
    })
  }

  onMakeActive(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Activate Sub Category', message: `Are you sure you want to activate ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activeSubCategory(resaturant._id);
      }
    })
  }

  activeSubCategory(id: any): void {
    this.isLoading = true;
    this.subcategoryService.updateSubCategory(id, { isActive: true }).subscribe(res => {
      this.getAllSubCategories();
    })
  }

  onDelete(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Delete Sub Category', message: `Are you sure you want to delete ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteSubCategory(resaturant._id);
      }
    })
  }
  deleteSubCategory(id: string): void {
    this.isLoading = true;
    this.subcategoryService.deleteSubCategory(id).subscribe(res => {
      this.getAllSubCategories();
    })
  }

  search(): void {
    this.getAllSubCategories();
  }

  createFilterQueryString() {
    let queryString = '';
    if (this.category) {
      queryString += `${queryString.length > 0 ? '&' : ''} categoryId=${this.category}`
    }
    return queryString.trim();
  }
  getcategories() {
    this.categoryService.getAllCategories('').subscribe(res => {
      this.categories = res.data;
    })
  }

}

