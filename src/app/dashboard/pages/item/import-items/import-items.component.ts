import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ItemService } from 'src/app/services/item/item.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-import-items',
  templateUrl: './import-items.component.html',
  styleUrls: ['./import-items.component.scss']
})
export class ImportItemsComponent implements OnInit {
  errorMessage: string = '';
  file: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImportItemsComponent>,
    private itemService: ItemService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    this.itemService.uploadFile(this.file).subscribe(response => {
      this.file = null;
      this.closeModal(true);
    }, err => {
      this.file = null;
      this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
    });
  }
  downloadSampleFile() {
    this.http.get('/item/download/csv', { responseType: 'text' })
      .subscribe((csvData: string) => {
        this.downloadFile(csvData, `all_items.csv`);
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
  closeModal(reload: boolean): void {
    this.dialogRef.close(reload);
  }
}
