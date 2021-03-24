import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ObjectFlags } from 'typescript';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    });
  }

  addBrand() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe(response => {
        this.toastrService.success("Marka başarıyla eklendi.");
        this.router.navigate(['/']);
        this.toastrService.info("Ana sayfaya yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Marka Eklenemedi");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız.");
    }
  }
}
