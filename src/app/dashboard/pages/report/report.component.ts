import { Component, OnInit } from '@angular/core';
import { startOfDay } from 'date-fns';
import { HttpClient } from '@angular/common/http'
import { ReportsService } from 'src/app/services/common/reports.service'
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportsComponent implements OnInit {
  reports: any = []
  public report: any = {
    location: '',
    itemName: '',
    type: '',
    start: startOfDay(new Date()),
    end: startOfDay(new Date()),
  }
  isLoading: boolean = false;
  items: any = [];
  item: string = '';
  location: string = '';
  reportName: string = '';
  constructor(private http: HttpClient, private reportsService: ReportsService, private itemService: ItemService) { }

  ngOnInit() {
    this.getAllItems();
  }
  downloadReport() {
    this.http.post('/reports', this.report, { responseType: 'text' })
      .subscribe((csvData: string) => {
        this.downloadFile(csvData, `${this.report.type}_reports.csv`);
      });
  }
  getReport() {
    this.isLoading = true;
    if (this.report.type === 'weekly') {
      const dates = this.getLastWeekDates();
      this.report.start = dates.startDate;
      this.report.end = dates.endDate;
    } else if (this.report.type === 'monthly') {
      const dates = this.getLastMonthDates()
      this.report.start = dates.startDate;
      this.report.end = dates.endDate;
    }
    this.reportsService.getReport(this.report).subscribe(res => {
      this.reportName = this.report.type === 'individual' || this.report.type === 'weekly' ||
        this.report.type === 'monthly' ? 'items' : this.report.type
      this.isLoading = false
      this.reports = res.data;
    })
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
  getLastWeekDates() {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 7);
    return { startDate, endDate }
  }
  getLastMonthDates() {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
    return { startDate, endDate }
  }
  getAllItems() {
    this.itemService.getAllItems('').subscribe(res => {
      this.items = res.data;
    })
  }
}
