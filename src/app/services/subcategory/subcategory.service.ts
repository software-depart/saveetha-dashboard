import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  subCategoryBaseURL = '/subcategory'
  constructor(private apiService: ApiService) { }

  getAllSubCategories(queryString: any): Observable<any> {
    let url = `${this.subCategoryBaseURL}?${queryString}`
    return this.apiService.get$(url, {});
  }

  createSubCategory(data: any): Observable<any> {
    return this.apiService.post$(this.subCategoryBaseURL, data);
  }

  updateSubCategory(id: string, data: any): Observable<any> {
    const url = `${this.subCategoryBaseURL}/${id}`
    return this.apiService.put$(url, data);
  }

  deleteSubCategory(id: string): Observable<any> {
    const url = `${this.subCategoryBaseURL}/${id}`
    return this.apiService.delete$(url, {});
  }

}

