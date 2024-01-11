import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemBaseURL = '/item'
  constructor(private apiService: ApiService) { }

  getAllItems(queryString: any): Observable<any> {
    let url = `${this.itemBaseURL}?${queryString}`
    return this.apiService.get$(url, {});
  }

  updateItem(id: string, data: any): Observable<any> {
    const url = `${this.itemBaseURL}/${id}`
    return this.apiService.put$(url, data);
  }
}

