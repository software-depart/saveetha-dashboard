import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) { }


  refreshToken() {
    let url: any = environment.user + '/refresh'
    let refreshToken = localStorage.getItem('refresh_token')
    return this.httpClient.post(url, { refreshToken: refreshToken }).pipe(
      map((response: any) => {
        this.saveData(response)
        return response.data.token.access_token
      })
    )
  }

  saveData(input: any) {
    localStorage.setItem('access_token', input.data.token.accessToken);
    localStorage.setItem('refresh_token', input.data.token.refreshToken)
    if (input.data.userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(input.data.userProfile));
    }
  }

  isAuthUser() {
    let userProfile: any = localStorage.getItem('userProfile');
    userProfile = JSON.parse(userProfile)
    return userProfile._id ? true : false;
  }
}
