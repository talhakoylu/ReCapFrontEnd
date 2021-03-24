import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  brand: Brand;
  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.createBrandUpdateForm();
        this.getCurrentBrand(params["brandId"]);
      }
    });
  }

  getCurrentBrand(brandId: number){
    this.brandService.getBrandById(brandId).subscribe(response =>{
      this.brand = response.data;
      this.brandUpdateForm.get('brandId')?.setValue(this.brand.brandId);
      this.brandUpdateForm.get('brandName')?.setValue(this.brand.brandName);
    });
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      brandName: ["", Validators.required]
    });
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(response => {
        this.toastrService.success("Marka başarıyla güncellendi.");
        this.router.navigate(['/']);
        this.toastrService.info("Ana sayfaya yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Marka güncellenemedi!");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız.");
    }
  }

}
