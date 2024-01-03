import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model: any = {
    address: {
      city: '',
      state: '',
      country: ''
    }
  }

  userProfile: any = {}

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userProfile = localStorage.getItem('userProfile');
    this.userProfile = JSON.parse(this.userProfile);
    this.model.userName = this.userProfile.userName
    this.model.firstName = this.userProfile.firstName
    this.model.lastName = this.userProfile.lastName
    this.model.emailId = this.userProfile.emailId
    this.model.mobileNo = this.userProfile.mobileNo
    this.model._id = this.userProfile._id
    this.model.dob = this.userProfile.dob
  }

  onSubmit(form: NgForm) {
    if(!form.invalid) {
      this.userService.updateUser(this.model).subscribe((data: any) => {
          console.log('data::',data);
      })
    }
  }

}

