import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { UserService } from 'src/app/services/user/user.service';
import { CampusService } from 'src/app/services/campus/campus.service'

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  model: any = {
    isActive: false,
    location: '',
    userId: '',
    firstName: '',
    lastName: '',
    address: '',
    collegeType: '',
    mobileNo: '',
    alternateNo: '',
    type: '',
    collegeName: ''
  }
  types = ['Super Admin', 'Admin', 'Student', 'Restaurant', 'Technician'];
  action: string = 'Create'
  title: string = 'Create User'
  mode: string = 'create'
  errorMessage: string = '';
  campuses: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    private userService: UserService,
    private campusService: CampusService) { }

  ngOnInit(): void {
    this.getAllCampuses();
    if (this.userService.isAdmin()) {
      this.types = ['Student', 'Restaurant', 'Technician']
    }
    if (this.data) {
      this.mode = 'update';
      this.model = {
        isActive: this.data.isActive,
        location: this.data.location,
        userId: this.data.userId,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        mobileNo: this.data.mobileNo,
        alternateNo: this.data.alternateNo,
        address: this.data.address,
        collegeType: this.data.collegeType,
        type: this.data.type,
        collegeName: this.data.collegeName
      }
      this.action = 'Update'
      this.title = 'Update User'
    }
  }

  onSubmit() {
    if (!this.validModel(this.model)) {
      this.errorMessage = 'Please fill in all the fields.'
      return;
    } else {
      if (!this.validMobileNo(this.model.mobileNo)) {
        this.errorMessage = 'Mobile number is invalid'
        return;
      }
      if (this.model.alternateNo && !this.validMobileNo(this.model.alternateNo)) {
        this.errorMessage = 'Alternate mobile number is invalid'
        return;
      }
    }
    if (this.mode === 'create') {
      this.userService.createUser(this.model).subscribe(res => {
        this.closeModal(true)
      }, err => {
        this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
      })
    } else {
      this.userService.updateUser(this.data._id, this.model).subscribe(res => {
        this.closeModal(true)
      }, err => {
        this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
      })
    }
  }
  validModel(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === '') {
          if (key !== 'alternateNo' && key !== 'lastName' && key !== 'collegeName') {
            return false;
          }
        }
      }
    }
    return true;
  }
  closeModal(reload: boolean): void {
    this.dialogRef.close(reload);
  }
  validMobileNo(mobile: string) {
    return /^\d{10}$/.test(mobile)
  }
  getAllCampuses() {
    this.campusService.getAllCampuses('').subscribe(res => {
      this.campuses = res.data;
    })
  }
}
