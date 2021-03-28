import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/login-model';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  userModel: UserModel;
  userUpdateForm: FormGroup;
  password: string;
  isSuccess = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.authService.userDetailFromToken();
    this.getUser();
    this.createUserUpdateForm();
  }


  getUser() {
    this.userService.getUserById(this.authService.userId).subscribe(response => {
      this.userModel = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        status: response.data.status,
        id: response.data.id
      }
      this.userUpdateForm.patchValue(this.userModel);
    });
  }

  get updateFormControls() { return this.userUpdateForm.controls; }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [''],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      status: [""]
    })
  }

  postUserUpdate() {
    if (this.userUpdateForm.valid) {
      let user = Object.assign({}, this.userUpdateForm.value);
      this.userModel = {
        email: user['email'],
        firstName: user['firstName'],
        lastName: user['lastName'],
        status: user['status'],
        id: user['id'],
      }
      this.userService.postUserUpdate(this.userModel, user['password']).subscribe(response => {
        this.toastrService.success(GlobalConstants.Messages.profileUpdateSuccess);
        this.isSuccess = true;
        this.toastrService.warning(GlobalConstants.Messages.profileUpdateAftreLoginRequried);
        setTimeout(() => {
          this.localStorageService.clean();
          this.router.navigateByUrl("/login");
        }, 3000);
      }, responseError => {
        if (user['password'] == null || user['password'] == undefined || user['password'].length == 0) {
          this.toastrService.error('Şifre alanı boş bırakılamaz.');
        }else{
          this.toastrService.error(responseError.error.message);
        }
      });
    }else{
      this.toastrService.error('Bilgileri eksiksiz doldurmanız gerekmekte.');
    }
  }
}
