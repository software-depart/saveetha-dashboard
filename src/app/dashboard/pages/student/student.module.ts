import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [
  {
    path: '',
    component: StudentComponent
  }
];

@NgModule({
  declarations: [
    StudentFormComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class StudentModule { }
