import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    reportsBaseURL = '/reports'
    constructor(private apiService: ApiService) { }

    getReport(data: any): Observable<any> {
        return this.apiService.post$(`${this.reportsBaseURL}/table`, data);
    }
}

