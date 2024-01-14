import { Component, ViewChild } from '@angular/core';
import { startOfDay } from 'date-fns';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportsComponent {
  public report: any = {
    type: '',
    start: startOfDay(new Date()),
    end: startOfDay(new Date()),
  }
  constructor(private http: HttpClient) { }

  downloadReport() {
    this.http.post('/reports', this.report, { responseType: 'text' })
      .subscribe((csvData: string) => {
        this.downloadFile(csvData, `${this.report.type}_reports.csv`);
      });
  }
  downloadFile(data: string, filename: string) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
