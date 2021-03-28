import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CompanyRequestModel } from 'src/app/models/company-request-model';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalPost } from 'src/app/models/rentalPost';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {

  cars: Car[] = []
  customer: CompanyRequestModel;
  customerId: Number;
  rentDate: Date;
  returnDate: Date;
  rentDateValue: Date;
  rentalCar: Rental;
  isRentBefore: Boolean = false;
  isLoggedIn: boolean = false;
  userId: number;
  isCompany = false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private router: Router,
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.isLoggedIn = this.authService.isAuthenticated();
        if (this.isLoggedIn) {
          this.authService.userDetailFromToken()
          this.userId = this.authService.userId;
          this.getCarDetail(params["carId"]);
          this.getRentalByCarId(params["carId"]);
          this.getCustomer();
        }
      }
    })
  }

  getCarDetail(id: number) {
    this.carService.getCarByIdDetail(id).subscribe(response => {
      this.cars = response.data;
    })
  }

  getCustomer() {
    this.customerService.getById(this.userId).subscribe(response => {
      if (response.data !== null) {
        this.customer = response.data;
        this.isCompany = true;
      }
    })
  }

  getRentMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10)
  }
  getReturnMinDate() {
    // var today  = new Date();
    // today.setDate(today.getDate() + 2);
    // return today.toISOString().slice(0,10)
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10)
  }
  createRental() {
    let MyRental: RentalPost = {
      rentDate: this.rentDate,
      returnDate: this.returnDate ? this.returnDate : null,
      carId: this.cars[0].carId,
      customerId: parseInt(this.customer.userId.toString())
    }
    this.paymentService.addToCart(MyRental);
    console.log(this.paymentService.listCart());

    this.router.navigate(['/payment/']);
    this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");

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
      return false;
    } else if (oldDate > today) {
      return false;
    }
    else {
      return true;
    }
  }

  checkClick() {
    if (this.checkAvailability() == true) {
      if (this.rentDate == null) {
        this.toastrService.warning("Başlangıç tarihi seçimi zorunludur!", "Hata - Eksik Alanlar Bulundu");
      } else {
        if (this.returnDate == null || this.returnDate > this.rentDate) {
          this.toastrService.success("Araç kiralanabilir.", "Araç Uygun");
          this.createRental();
        } else if (this.returnDate < this.rentDate) {
          this.toastrService.error("Dönüş tarihi başlangıç tarihinden küçük olamaz!");
        } else if (this.returnDate == this.rentDate) {
          this.toastrService.error("Kiralama işlemi en az 1 gün olmalıdır!");
        }
      }
    } else {
      this.toastrService.warning("Araç kiralama işlemi gerçekleşemez.", "Araç Kullanımda");
    }
  }

}
