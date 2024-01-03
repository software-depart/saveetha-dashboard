import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { Routes,RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component:MenuComponent
  }
];

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class MenuModule { }
