import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemBaseURL = '/item'
  constructor(private apiService: ApiService, private http: HttpClient) { }

  getAllItems(queryString: any): Observable<any> {
    let url = `${this.itemBaseURL}?${queryString}`
    return this.apiService.get$(url, {});
  }

  updateItem(id: string, data: any): Observable<any> {
    const url = `${this.itemBaseURL}/${id}`
    return this.apiService.put$(url, data);
  }
  createItem(data: any): Observable<any> {
    return this.apiService.post$(this.itemBaseURL, data);
  }

  deleteItem(id: string): Observable<any> {
    const url = `${this.itemBaseURL}/${id}`
    return this.apiService.delete$(url, {});
  }
  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('csv', file);
    const url = `${this.itemBaseURL}/import/csv`
    // const headers = new HttpHeaders({
    //   'Content-Type': 'multipart/form-data',
    // });

    return this.http.post(url, formData);
  }
}

