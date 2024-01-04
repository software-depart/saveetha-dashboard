import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  whiteUrls = ['login', 'register']
  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Don't need authentication
    if (this.whiteUrls.find((data: any) => request.url.includes(data))) {
      next.handle(request);
    }
    //need authentication
    const user = localStorage.getItem("user");
    if (user) {
      const userJson = JSON.parse(user);
      if (userJson.accessToken)
        request = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${userJson.accessToken}`
          }
        })
    }

    return next.handle(request).pipe(
      tap((response: any) => {
        if (response.code === 401) {
          //if token is expired
          let access_token = this.authService.refreshToken();
          let retryRequest = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${access_token}`
            }
          })
          next.handle(retryRequest).pipe(
            catchError(error => {
              return throwError('unauthorized')
            })
          )
        }
      })
    );
  }
}
