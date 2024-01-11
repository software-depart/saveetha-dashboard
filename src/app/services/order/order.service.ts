import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orderBaseURL = '/order'
  constructor(private apiService: ApiService) { }

  getAllOrders(queryString: any): Observable<any> {
    let url = `${this.orderBaseURL}?${queryString}`
    return this.apiService.get$(url, {});
  }
}
