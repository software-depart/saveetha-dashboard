import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-campus-form',
  templateUrl: './campus-form.component.html',
  styleUrls: ['./campus-form.component.css']
})
export class CampusFormComponent {
  model: any = {}
  onSubmit(form: NgForm) {

  }
}
