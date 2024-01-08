import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FoodcourtService {
  foodcourtBaseURL = '/food-court'
  constructor(private apiService: ApiService) { }

  getAllFoodcourts(queryString: any): Observable<any> {
    let url = `${this.foodcourtBaseURL}?${queryString}`
    return this.apiService.get$(url, {});
  }

  createFoodcourt(data: any): Observable<any> {
    return this.apiService.post$(this.foodcourtBaseURL, data);
  }

  updateFoodcourt(id: string, data: any): Observable<any> {
    const url = `${this.foodcourtBaseURL}/${id}`
    return this.apiService.put$(url, data);
  }

  deleteFoodcourt(id: string): Observable<any> {
    const url = `${this.foodcourtBaseURL}/${id}`
    return this.apiService.delete$(url, {});
  }

}

