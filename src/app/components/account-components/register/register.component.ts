import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/register-model';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordConfirmValidator } from 'src/app/validators/password-confirm-validator';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSuccess = false;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  goBack() {
    this.location.back();
  }

  get registerFormControls() { return this.registerForm.controls; }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    }, {
      validator: PasswordConfirmValidator.confirmed('password', 'confirmPassword'),
    } as AbstractControlOptions)
  }


  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      var registerInstance: RegisterModel = {
        email: registerModel.email,
        firstName: registerModel.firstName,
        lastName: registerModel.lastName,
        password: registerModel.password
      };
      this.authService.register(registerInstance).subscribe(response => {
        this.toastrService.success(GlobalConstants.Messages.registerSuccess);
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['']);
        }, 3000);
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage);
          }
        }
      })
    }
  }
}
