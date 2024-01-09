import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampusComponent } from './campus.component';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CampusFormComponent } from './campus-form/campus-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


const routes: Routes = [
  {
    path: '',
    component: CampusComponent
    
  }
];

@NgModule({
  declarations: [
    CampusComponent,
    CampusFormComponent
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
export class CampusModule { }
