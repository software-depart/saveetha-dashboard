import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any = [];
  userProfile: any = {}
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userProfile = localStorage.getItem('user')
    this.userProfile = JSON.parse(this.userProfile);
    // this.search()
  }

  search() {
    this.userService.getAllUsers('').subscribe((data: any) => {
      this.users = data.data
    })
  }

  onSubmit(event: any) {
    if(event._id) {
      this.userService.updateUser('id', event).subscribe((data: any) => {
       this.search();
      })
    } else {
      this.userService.createUser(event).subscribe((data: any) => {
       this.search()
      })
    }
  }

  delete(id: string) {
    this.userService.deleteUser(id).subscribe((data: any) => {
     this.search()
    })
  }

  isApproved(input: any) {
    input.isApproved = true;
    this.userService.updateUser('id', input).subscribe((data: any) => {
      this.search();
    })
  }
}
