import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-restaurent-form',
  templateUrl: './restaurent-form.component.html',
  styleUrls: ['./restaurent-form.component.css']
})
export class RestaurentFormComponent {

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
