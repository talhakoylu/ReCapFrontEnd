import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private location: Location,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  goBack() {
    this.location.back();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get loginFormControls() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.valid) {
      let loginModel = this.loginForm.value;
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.success(GlobalConstants.Messages.loginSuccess);
        localStorage.setItem("token", response.data.token);
      }, responseError => {
        this.toastrService.error(GlobalConstants.Messages.loginError);
      });
    } else {
      if (this.loginForm.get('email')?.hasError('required') && this.loginForm.get('password')?.hasError('required')) {
        this.toastrService.error("Email ve şifre alanı boş olamaz.");
      } else if (this.loginForm.get('email')?.hasError('required')) {
        this.toastrService.error("Email alanı boş olamaz.");
      } else {
        this.toastrService.error("Şifre alanı boş olamaz.");
      }
    }
  }

}
