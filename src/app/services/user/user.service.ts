import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) {}

  createUser(input: any) {
    let url: any = environment.user + '/' 
    return this.httpClient.post(url,input)
  }

  updateUser(input: any) {
    let url: any = environment.user + '/' + input._id
    return this.httpClient.put(url,input).pipe(
      map((data: any) => {
        localStorage.setItem('userProfile::',JSON.stringify(data));
        return data
      })
    );
  }

  deleteUser(id: any) {
    let url: any = environment.user + '/' + id;
    return this.httpClient.delete(url);
  }
  
  getUser() {}

  searchUser() {
    let url: any = environment.user + '/';
    return this.httpClient.get(url);
  }
  
}
