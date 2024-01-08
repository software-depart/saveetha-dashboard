import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodCourtComponent } from './food-court.component';
import { FoodFormComponent } from './food-form/food-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


const routes: Routes = [
  {
    path: '',
    component: FoodCourtComponent
    
  }
];

@NgModule({
  declarations: [
    FoodCourtComponent,
    FoodFormComponent
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
export class FoodCourtModule { }
