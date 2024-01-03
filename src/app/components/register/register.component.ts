import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {
    type: ''
  }
  users: any = []
  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
   
  }

  onSubmit(form: NgForm) {
    if(!form.invalid) {
      this.userService.createUser(this.model).subscribe((data: any) => {
        this.router.navigate(['/login'])
      })
    }
  }

}
