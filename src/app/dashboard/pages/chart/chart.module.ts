import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart.component';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component:ChartComponent
  }
];


@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgChartsModule
  ]
})
export class ChartModule { }
