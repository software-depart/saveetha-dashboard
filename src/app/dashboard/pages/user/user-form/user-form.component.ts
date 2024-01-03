import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() model: any = {
    type: ''
  }
  
  @Output() modelChange: any = new EventEmitter<any>();
  
  constructor() {}

  ngOnInit(): void {
   
  }

  onSubmit(form: NgForm) {
    if(!form.invalid) {
      this.modelChange.emit(this.model);
      this.closeModal();
    }
  }

  @ViewChild('closeButton',{static: true}) closebutton: any;
  closeModal() {
    this.closebutton.nativeElement.click()
  }
}
