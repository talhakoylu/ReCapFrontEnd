import { verifyHostBindings } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyRequestModel } from 'src/app/models/company-request-model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-company',
  templateUrl: './user-company.component.html',
  styleUrls: ['./user-company.component.css']
})
export class UserCompanyComponent implements OnInit {
  customerForm: FormGroup;
  userId: number;
  company: CompanyRequestModel;
  isCompany: boolean;
  isClickedUpdateButton = false;
  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private customerService: CustomerService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.userDetailFromToken();
    this.userId = this.authService.userId;
    this.getCompany();
    this.isCompany;
    this.createCustomerForm()
  }

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      companyName: ["", Validators.required]
    });
  }

  getCompany() {
    this.customerService.getById(this.userId).subscribe(response => {
      if (response.data !== null) {
        this.company = {
          companyName: response.data.companyName,
          userId: response.data.userId
        }
        return this.isCompany = true;
      } else {
        return this.isCompany = false;
      }
    })
  }
  get customerFormControls() { return this.customerForm.controls; }
  postCompanyForm() {
    if (this.customerForm.valid) {
      this.company = Object.assign({}, this.customerForm.value);
      let companyModel: CompanyRequestModel = {
        companyName: this.company['companyName'],
        userId: this.userId
      }
      this.isClickedUpdateButton = true;
      companyModel.userId = parseInt(companyModel.userId.toString());
      this.customerService.addCustomer(companyModel).subscribe(response => {
        this.toastrService.success('Başarıyla şirket hesabı oluşturdunuz.');
        this.onRefresh();
      }, responseError => {
        console.log(responseError);

        this.toastrService.error(responseError.error.message);
      })
    }
  }


  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
}
