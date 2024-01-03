import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];


@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
