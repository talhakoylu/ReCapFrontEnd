import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarStandart } from 'src/app/models/car-standart';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  car: CarStandart;
  carUpdateForm: FormGroup;
  colors: Color[] = [];
  brands: Brand[] = [];
  selectedColor: number;
  selectedBrand: number;
  modelYearList: number[] = [];
  

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.createUpdateForm();
        this.getCurrentCar(params["carId"]);
        this.getColors();
        this.getBrands();
        this.createModelYearArray();
      }
    });
  }

  createModelYearArray() {
    let currentYear: number = new Date().getFullYear();
    for (let i = currentYear + 1; i >= 1950; i--) {
      this.modelYearList.push(i);
    }
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  getCurrentCar(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.car = response.data;
      this.selectedBrand = this.car.brandId;
      this.selectedColor = this.car.colorId;
      this.carUpdateForm.get('colorId')?.setValue(this.selectedColor);
      this.carUpdateForm.get('brandId')?.setValue(this.selectedBrand);
      this.carUpdateForm.get('carId')?.setValue(this.car.carId);
      this.carUpdateForm.get('dailyPrice')?.setValue(this.car.dailyPrice);
      this.carUpdateForm.get('description')?.setValue(this.car.description);
      this.carUpdateForm.get('modelYear')?.setValue(this.car.modelYear);
    });
  }

  createUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: ["", Validators.required],
      colorId: ["", Validators.required],
      brandId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.brandId = parseInt(carModel.brandId);
      carModel.colorId = parseInt(carModel.colorId);
      carModel.modelYear = parseInt(carModel.modelYear);
      this.carService.updateCar(carModel).subscribe(response => {
        this.toastrService.success("Araba başarıyla güncellendi.");
        this.router.navigate(['/cars/']);
        this.toastrService.info("Arabalar sayfasına yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Araç Güncellenemedi");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız.");
    }

  }
}
