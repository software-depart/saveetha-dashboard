import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestaurentComponent } from './restaurent.component';
import { RestaurentFormComponent } from './restaurent-form/restaurent-form.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

const routes: Routes = [
  {
    path: '',
    component: RestaurentComponent
  }
];

@NgModule({
  declarations: [
    RestaurentComponent,
    RestaurentFormComponent
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
export class RestaurentModule { }
