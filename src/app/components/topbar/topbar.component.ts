import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  userName: string = ''
  searchText: string = ''
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.resetSearch.subscribe(res => {
      this.searchText = ''
    })
    const user = this.userService.getUser();
    this.userName = user.firstName;
  }

  logout(): void {
    this.userService.logout();
  }

  onSearch() {
    this.userService.searchUpdated.next(this.searchText)
  }

}

