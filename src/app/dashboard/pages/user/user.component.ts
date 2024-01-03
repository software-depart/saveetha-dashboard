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
    this.userProfile = localStorage.getItem('userProfile')
    this.userProfile = JSON.parse(this.userProfile);
    this.search()
  }

  search() {
    this.userService.searchUser().subscribe((data: any) => {
      this.users = data.data
    })
  }

  onSubmit(event: any) {
    if(event._id) {
      this.userService.updateUser(event).subscribe((data: any) => {
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
    this.userService.updateUser(input).subscribe((data: any) => {
      this.search();
    })
  }
}
