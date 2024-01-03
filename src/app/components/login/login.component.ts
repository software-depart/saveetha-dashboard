import { Component, OnInit } from '@angular/core';
import { NgForm, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from '../../services/user/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  signInForm = new UntypedFormGroup({
    userId: new UntypedFormControl('', [
      Validators.required
    ]),
    password: new UntypedFormControl({
      value: '',
      disabled: false
    }, [Validators.required])
  })

  ngOnInit() {

  }

  onSubmit() {
    this.errorMessage = '';
    const payLoad = {
      userId: this.signInForm.value.userId,
      password: this.signInForm.value.password
    }
    this.userService.signin$(payLoad).subscribe((res: any) => {
      this.userService.setUser$(res.data)
      this.router.navigate(['/'])
    }, err => {
      this.errorMessage = err?.error?.error?.message || 'Server failure. Please try again later';
    })
  }
}
