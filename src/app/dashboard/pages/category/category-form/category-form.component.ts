import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit{
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
