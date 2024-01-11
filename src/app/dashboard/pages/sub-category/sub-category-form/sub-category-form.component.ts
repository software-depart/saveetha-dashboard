import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SubcategoryService, } from 'src/app/services/subcategory/subcategory.service';
import { CategoryService, } from 'src/app/services/category/category.service'

@Component({
  selector: 'app-sub-category-form',
  templateUrl: './sub-category-form.component.html',
  styleUrls: ['./sub-category-form.component.scss']
})
export class SubCategoryFormComponent implements OnInit {
  categories: any = [];
  model: any = {
    isApproved: false,
    isActive: false,
    categoryId: '',
    name: '',
  }
  action: string = 'Create'
  title: string = 'Create Sub Category'
  mode: string = 'create'
  errorMessage: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SubCategoryFormComponent>,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getcategories();
    if (this.data) {
      this.mode = 'update';
      this.model = {
        isApproved: this.data.isApproved,
        isActive: this.data.isActive,
        categoryId: this.data.categoryId._id,
        name: this.data.name,
      }
      this.action = 'Update'
      this.title = 'Update Sub Category'
    }
  }
  onSubmit() {
    if (!this.validModel(this.model)) {
      this.errorMessage = 'Please fill in all the fields.'
      return;
    }
    if (this.mode === 'create') {
      this.subcategoryService.createSubCategory(this.model).subscribe(res => {
        this.closeModal(true)
      }, err => {
        this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
      })
    } else {
      this.subcategoryService.updateSubCategory(this.data._id, this.model).subscribe(res => {
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
  getcategories() {
    this.categoryService.getAllCategories('').subscribe(res => {
      this.categories = res.data;
    })
  }
}
