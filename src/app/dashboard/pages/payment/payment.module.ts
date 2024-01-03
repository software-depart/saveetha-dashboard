import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component:PaymentComponent
  }
];


@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class PaymentModule { }
