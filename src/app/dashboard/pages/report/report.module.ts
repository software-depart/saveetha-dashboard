import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { Routes,RouterModule } from '@angular/router';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent
    
  }
];

@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlatpickrModule.forRoot(),
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgChartsModule
    
  ]
})
export class ReportModule { }
