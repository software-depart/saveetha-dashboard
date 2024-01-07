import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryBaseURL = '/category'
  constructor(private apiService: ApiService) { }

  getAllCategories(queryString: any): Observable<any> {
    let url = `${this.categoryBaseURL}?${queryString}`
    return this.apiService.get$(url, {});
  }

  createCategory(data: any): Observable<any> {
    return this.apiService.post$(this.categoryBaseURL, data);
  }

  updateCategory(id: string, data: any): Observable<any> {
    const url = `${this.categoryBaseURL}/${id}`
    return this.apiService.put$(url, data);
  }

  deleteCategory(id: string): Observable<any> {
    const url = `${this.categoryBaseURL}/${id}`
    return this.apiService.delete$(url, {});
  }
}