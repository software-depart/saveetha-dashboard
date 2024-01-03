import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { Routes,RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component:ItemComponent 
  }
];


@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class ItemModule { }
