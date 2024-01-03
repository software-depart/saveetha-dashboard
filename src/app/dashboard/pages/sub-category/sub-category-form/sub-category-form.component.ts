import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sub-category-form',
  templateUrl: './sub-category-form.component.html',
  styleUrls: ['./sub-category-form.component.css']
})
export class SubCategoryFormComponent implements OnInit{
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
