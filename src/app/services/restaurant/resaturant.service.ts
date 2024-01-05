import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ResaturantService {
  restaurantBaseURL = '/restaurant'
  constructor(private apiService: ApiService) { }

  getAllRestaurants(queryString: any): Observable<any> {
    let url = `${this.restaurantBaseURL}?${queryString}`
    return this.apiService.get$(url, {});
  }

  createRestaurant(data: any): Observable<any> {
    return this.apiService.post$(this.restaurantBaseURL, data);
  }

  updateRestaurant(id: string, data: any): Observable<any> {
    const url = `${this.restaurantBaseURL}/${id}`
    return this.apiService.put$(url, data);
  }

  deleteRestaurant(id: string): Observable<any> {
    const url = `${this.restaurantBaseURL}/${id}`
    return this.apiService.delete$(url, {});
  }

}

