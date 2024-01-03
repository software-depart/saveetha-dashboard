import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit{
  @Input() name:string=""
  
  model:any = {}
  constructor() {}

  ngOnInit(): void {
   
  }

  onSubmit(form: NgForm) {
   
  }

  @ViewChild('closeButton',{static: true}) closebutton: any;
  closeModal() {
    this.closebutton.nativeElement.click()
  }


}
