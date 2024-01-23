import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog'
import { StudentFormComponent } from './student-form/student-form.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent implements OnInit {
  users: any;
  isLoading: boolean | undefined;
  location: string = '';
  allUsers: any = []
  constructor(public userService: UserService, private dialog: MatDialog) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.userService.resetSearch.next('')
    this.userService.searchUpdated.subscribe(query => {
      if (this.allUsers.length > 0) {
        this.users = this.userService.globalSearch(query.toLowerCase(), this.allUsers,
          ['userId', 'firstName', 'type', 'mobileNo', 'collegeType', 'collegeName', 'location', 'address']);
      }
    })
    this.getAllUsers();
  }

  addUser() {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '800px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.location = '';
        this.getAllUsers();
      }
    })
  }
  updateUser(user: any): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '800px',
      disableClose: true,
      data: user
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllUsers();
      }
    })
  }

  getAllUsers() {
    // const queryString = 'location=Thandalam Campus'
    const queryString = this.createFilterQueryString();
    this.isLoading = true;
    this.userService.getAllUsers(queryString).subscribe(res => {
      this.isLoading = false;
      this.users = res.data;
      this.allUsers = res.data;
    })
  }

  onMakeActive(user: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Activate User', message: `Are you sure you want to activate ${user.firstName} - ${user.userId}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activateUser(user._id);
      }
    })
  }

  activateUser(id: any): void {
    this.isLoading = true;
    this.userService.updateUser(id, { isActive: true }).subscribe(res => {
      this.getAllUsers();
    })
  }

  onDelete(user: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Delete User', message: `Are you sure you want to delete ${user.firstName} - ${user.userId}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.deleteUser(user._id);
      }
    })
  }
  deleteUser(id: string): void {
    this.isLoading = true;
    this.userService.deleteUser(id).subscribe(res => {
      this.getAllUsers();
    })
  }

  search(): void {
    this.getAllUsers();
  }

  createFilterQueryString() {
    let queryString = '';
    if (this.location) {
      queryString += `${queryString.length > 0 ? '&' : ''} location=${this.location}`
    }
    return queryString.trim();
  }

}