import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentBaseURL = '/payment'
  constructor(private apiService: ApiService) { }

  getAllPayments(): Observable<any> {
    return this.apiService.get$(this.paymentBaseURL, {});
  }
}
