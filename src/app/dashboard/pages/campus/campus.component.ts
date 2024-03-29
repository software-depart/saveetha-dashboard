import { Component, OnInit } from '@angular/core';
import { CampusService } from 'src/app/services/campus/campus.service';
import { MatDialog } from '@angular/material/dialog'
import { CampusFormComponent } from './campus-form/campus-form.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})

export class CampusComponent implements OnInit {
  campuses: any = [];
  isLoading: boolean | undefined;
  location: string = '';
  allCampuses: any = [];
  constructor(private campusService: CampusService, private dialog: MatDialog, private userService: UserService) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.userService.resetSearch.next('')
    this.getAllCampuses();
    this.userService.searchUpdated.subscribe(query => {
      if (this.allCampuses.length > 0) {
        this.campuses = this.userService.globalSearch(query.toLowerCase(), this.allCampuses, ['name', 'createdBy.firstName']);
      }
    })
  }

  addCampus() {
    const dialogRef = this.dialog.open(CampusFormComponent, {
      width: '500px',
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.location = '';
        this.getAllCampuses();
      }
    })
  }
  updateCampus(campus: any): void {
    const dialogRef = this.dialog.open(CampusFormComponent, {
      width: '500px',
      disableClose: true,
      data: campus
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAllCampuses();
      }
    })
  }

  getAllCampuses() {
    const queryString = this.createFilterQueryString();
    this.isLoading = true;
    this.campusService.getAllCampuses(queryString).subscribe(res => {
      this.isLoading = false;
      this.campuses = res.data;
      this.allCampuses = res.data;
    })
  }
  onApprove(campus: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Approve Campus', message: `Are you sure you want to approve ${campus.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.approveCampus(campus._id);
      }
    })
  }

  approveCampus(id: any): void {
    this.isLoading = true;
    this.campusService.updateCampus(id, { isApproved: true }).subscribe(res => {
      this.getAllCampuses();
    })
  }

  onMakeActive(resaturant: any): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '500px',
      disableClose: true,
      data: { title: 'Activate Campus', message: `Are you sure you want to activate ${resaturant.name}?` }

    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.activeCampus(resaturant._id);
      }
    })
  }

  activeCampus(id: any): void {
    this.isLoading = true;
    this.campusService.updateCampus(id, { isActive: true }).subscribe(res => {
      this.getAllCampuses();
    })
  }

  onDelete(campus: any): void {
    if (campus.isApproved) {
      const dialogRef = this.dialog.open(AlertComponent, {
        width: '500px',
        disableClose: true,
        data: { title: 'Delete Campus', message: `Cannot delete ${campus.name}. As Campus is already approved.`, warning: true }

      })
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          return;
        }
      })
    } else {
      const dialogRef = this.dialog.open(AlertComponent, {
        width: '500px',
        disableClose: true,
        data: { title: 'Delete Campus', message: `Are you sure you want to delete ${campus.name}?` }

      })
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.deleteCampus(campus._id);
        }
      })
    }
  }
  deleteCampus(id: string): void {
    this.isLoading = true;
    this.campusService.deleteCampus(id).subscribe(res => {
      this.getAllCampuses();
    })
  }

  search(): void {
    this.getAllCampuses();
  }

  createFilterQueryString() {
    let queryString = '';
    if (this.location) {
      queryString += `${queryString.length > 0 ? '&' : ''} location=${this.location}`
    }
    return queryString.trim();
  }
}