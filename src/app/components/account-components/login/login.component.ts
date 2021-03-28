import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSuccess = false;
  returnUrl: string;
  token: any;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
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
        this.localStorageService.add("token", response.data.token);
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigateByUrl(this.returnUrl);
        }, 3000);
      }, responseError => {
        this.toastrService.error(GlobalConstants.Messages.loginError);
      })
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
