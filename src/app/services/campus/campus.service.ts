import { Injectable } from '@angular/core';
import { ApiService } from '../common/api.service';
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CampusService {
    campusBaseURL = '/campus'
    constructor(private apiService: ApiService) { }

    getAllCampuses(queryString: any): Observable<any> {
        let url = `${this.campusBaseURL}?${queryString}`
        return this.apiService.get$(url, {});
    }

    createCampus(data: any): Observable<any> {
        return this.apiService.post$(this.campusBaseURL, data);
    }

    updateCampus(id: string, data: any): Observable<any> {
        const url = `${this.campusBaseURL}/${id}`
        return this.apiService.put$(url, data);
    }

    deleteCampus(id: string): Observable<any> {
        const url = `${this.campusBaseURL}/${id}`
        return this.apiService.delete$(url, {});
    }
}