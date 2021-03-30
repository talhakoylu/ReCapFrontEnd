import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FindeksModel } from 'src/app/models/findeks-model';
import { AuthService } from 'src/app/services/auth.service';
import { FindeksService } from 'src/app/services/findeks.service';

@Component({
  selector: 'app-user-findeks-score',
  templateUrl: './user-findeks-score.component.html',
  styleUrls: ['./user-findeks-score.component.css']
})
export class UserFindeksScoreComponent implements OnInit {
  isHasFindeksScore: boolean = false;
  findeksModel: FindeksModel;
  findeksForm: FormGroup;
  spinner = false;
  constructor(
    private authService: AuthService,
    private findeksService: FindeksService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.userDetailFromToken();
    this.getUserFindeksScore();
    this.createFindeksForm();
  }

  getUserFindeksScore() {
    this.findeksService.getByUserId(this.authService.userId).subscribe(response => {
      if (response.data == null || response.data == undefined) {
        this.isHasFindeksScore = false;
        console.log(this.isHasFindeksScore);
      } else {
        this.findeksModel = response.data;
        this.isHasFindeksScore = true;
        console.log(response.data);
      }
    })
  }
  get findeksFormControls() { return this.findeksForm.controls; }

  createFindeksForm() {
    let currentYear: number = new Date().getFullYear();
    this.findeksForm = this.formBuilder.group({
      year: ["", [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.min(1920), Validators.max(currentYear)]],
      month: ["", [Validators.required, Validators.maxLength(2), Validators.minLength(2), Validators.max(12), Validators.min(1)]],
      day: ["", [Validators.required, Validators.maxLength(2), Validators.minLength(2), Validators.max(31), Validators.min(1)]],
      nationalIdentity: ["", [Validators.required, Validators.minLength(11)]],
    })
  }

  postFindeksForm() {
    if (this.findeksForm.valid) {
      let findeksModel: FindeksModel = Object.assign({}, this.findeksForm.value);
      findeksModel.day = findeksModel.day.toString();
      findeksModel.nationalIdentity = findeksModel.nationalIdentity.toString();
      findeksModel.year = findeksModel.year.toString();
      findeksModel.month = findeksModel.month.toString();
      findeksModel.userId = parseInt(this.authService.userId.toString());
      this.spinner = true;
      this.findeksService.postAdd(findeksModel).subscribe(response => {
        this.toastrService.info("Findeks skorunuz başarıyla hesaplandı.");
      }, responseError => {
        this.toastrService.error(responseError.Errors);
      })
      this.onRefresh();
    } else {
      this.toastrService.error("Formu eksiksiz ve doğru doldurunuz!");
    }
  }

  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }

}

