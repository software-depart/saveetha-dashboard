import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //eslint-disable-next-line
  defaultHeaders: any = {
    'Content-Type': 'application/json'
  };

  constructor(private readonly http: HttpClient) { }

  //eslint-disable-next-line
  request$(method: string, path: string, params?: any, data?: any, headers?: any): Observable<any> {
    const headerList = Object.assign({}, this.defaultHeaders, headers);
    const reqHeaders: HttpHeaders = new HttpHeaders(headerList);
    let reqParams: HttpParams = new HttpParams();


    return this.http
      .request(method, path, {
        headers: reqHeaders,
        params: reqParams,
        body: data
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          //TODO log the error and show a message to the user
          return throwError(error);
        }),
        finalize(() => { })
      );
  }

  //eslint-disable-next-line
  delete$<T>(path: string, data?: any, params?: any): Observable<any> {
    return this.request$('DELETE', path, params, data, {});
  }

  //eslint-disable-next-line
  get$<T>(path: string, params?: any): Observable<any> {
    return this.request$('GET', path, params, {}, {});
  }

  //eslint-disable-next-line
  patch$<T>(path: string, data?: any): Observable<any> {
    return this.request$('PATCH', path, {}, data, {});
  }

  //eslint-disable-next-line
  post$<T>(path: string, data?: any): Observable<any> {
    return this.request$('POST', path, {}, data, {});
  }

  //eslint-disable-next-line
  put$<T>(path: string, data?: any, params?: any): Observable<any> {
    return this.request$('PUT', path, params, data, {});
  }

  //used mainly to attach the Authorization header...
  //eslint-disable-next-line
  setHeader(header: string, value: string) {
    if (header && value) {
      this.defaultHeaders[header] = value;
    }
  }

  removeHeader(header: string): void {
    if (this.defaultHeaders[header]) {
      delete this.defaultHeaders[header];
    }
  }
}
