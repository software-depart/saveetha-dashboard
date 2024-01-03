import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {}

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    if(!form.invalid) {
       this.authService.login(this.model).subscribe((data: any) => {
          this.router.navigate(['/']);
       })
    }
  }
}
