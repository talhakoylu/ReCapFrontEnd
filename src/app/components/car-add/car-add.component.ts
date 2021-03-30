import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;
  colors: Color[] = [];
  brands: Brand[] = [];
  modelYearList: number[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private brandService: BrandService,
    private carService: CarService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createCarAddForm();

    this.getBrandList();
    this.getColorList();
    this.createModelYearArray();
  }

  createModelYearArray() {
    let currentYear: number = new Date().getFullYear();
    for (let i = currentYear + 1; i >= 1950; i--) {
      this.modelYearList.push(i);
    }
  }

  getColorList() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  getBrandList() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      findeksScore: ["", [Validators.required, Validators.min(0), Validators.max(1901)]]
    });
  }
  get carFormControls() { return this.carAddForm.controls; }
  addCar() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);
      carModel.modelYear = parseInt(carModel.modelYear);
      this.carService.addCar(carModel).subscribe(response => {
        this.toastrService.success("Araba başarıyla eklendi.");
        this.router.navigate(['/cars/']);
        this.toastrService.info("Araba sayfasına yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Araç Eklenemedi");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız.");
    }

  }
}
