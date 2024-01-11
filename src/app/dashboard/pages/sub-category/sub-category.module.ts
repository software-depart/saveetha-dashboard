import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoryComponent } from './sub-category.component';
import { SubCategoryFormComponent } from './sub-category-form/sub-category-form.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


const routes: Routes = [
  {
    path: '',
    component: SubCategoryComponent
  }
];

@NgModule({
  declarations: [
    SubCategoryFormComponent,
    SubCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSlideToggleModule
  ]
})
export class SubCategoryModule { }
