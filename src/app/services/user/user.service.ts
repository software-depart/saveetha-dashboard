import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'
import { ApiService } from '../common/api.service'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  signinURL = '/auth/login'
  usersBaseURL = '/user'

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) { }

  getAllUsers(queryString: any): Observable<any> {
    let url = `${this.usersBaseURL}?${queryString}`
    return this.apiService.get$(url, {});
  }

  createUser(data: any): Observable<any> {
    return this.apiService.post$(this.usersBaseURL, data);
  }

  updateUser(id: string, data: any): Observable<any> {
    const url = `${this.usersBaseURL}/${id}`
    return this.apiService.put$(url, data);
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.usersBaseURL}/${id}`
    return this.apiService.delete$(url, {});
  }

  signin$(data: any): Observable<any> {
    return this.apiService.post$(this.signinURL, data);
  }

  setUser$(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  getUser() {
    let user = localStorage.getItem('user')
    const parsedUser = user ? JSON.parse(user) : null
    return parsedUser.userInfo;
  }
  isAdmin() {
    const user = this.getUser();
    return user.type === 'Admin';
  }
  isSuperAdmin() {
    const user = this.getUser();
    return user.type === 'Super Admin';
  }
}
