import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { FindeksModel } from 'src/app/models/findeks-model';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars: Car[] = [];
  images: CarImage[] = [];
  rentalCar: Rental;
  isRentBefore: Boolean = false;
  userFindeksPoint: FindeksModel;
  isLoggedIn: boolean = false;
  findeksScoreLoaded: boolean = false;
  userFindeksScoreNull: boolean = false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private findeksService: FindeksService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.activatedRoute.params.subscribe(params => {

      if (this.isLoggedIn == true) {
        if (params["carId"]) {
          this.authService.userDetailFromToken();
          this.getCarByIdDetail(params["carId"]);
          this.getImagesByCarId(params["carId"]);
          this.getRentalByCarId(params["carId"]);
          this.findeksScoreCheck();
        }
      } else {
        this.getCarByIdDetail(params["carId"]);
        this.getImagesByCarId(params["carId"]);
        this.getRentalByCarId(params["carId"]);
      }

    })
  }

  getCarByIdDetail(id: number) {
    this.carService.getCarByIdDetail(id).subscribe(response => {
      this.cars = response.data;
    })
  }

  getImagesByCarId(id: number) {
    this.carImageService.getCarImagesById(id).subscribe(response => {
      this.images = response.data;

    })
  }

  getRentalByCarId(id: number) {
    this.rentalService.getRentalByCarId(id).subscribe(response => {
      if (response.data == null) {
        this.isRentBefore = false;
      } else {
        this.rentalCar = response.data;
        this.isRentBefore = true;
      }
    })
  }

  checkAvailability() {
    if (!this.isRentBefore) {
      this.toastrService.success("araç kiralanabilir", "Araç Boşta");
      return true;
    } else {
      return this.rentedBeforeCarCheck();
    }
  }

  rentedBeforeCarCheck() {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    let today = formatDate(now, 'yyyy/MM/dd', 'en');
    let oldDate = formatDate(this.rentalCar.returnDate, 'yyyy/MM/dd', 'en');

    if (this.rentalCar.returnDate == null) {
      this.toastrService.warning("Araç kullanımdadır ve dönüş tarihi henüz belli değildir.", "Hata");
      return false;
    } else if (oldDate > today) {
      this.toastrService.warning("Bu araç kullanımdadır. Tahmini dönüş zamanı " + oldDate, "Hata");
      return false;
    }
    else {
      this.toastrService.success("araç kiralanabilir", "Araç Boşta");
      return true;
    }
  }

  findeksScoreCheck() {
    this.findeksService.getByUserId(this.authService.userId).subscribe(response => {
      this.findeksScoreLoaded = true;
      if (response.data === null || response.data === undefined) {
        this.userFindeksScoreNull = true;
      } else {
        this.userFindeksScoreNull = false;
        this.userFindeksPoint = response.data;
      }
    })
  }
}
