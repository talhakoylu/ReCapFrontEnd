import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cart-item';
import { CartItems } from 'src/app/models/cart-items';
import { CreditCardModel } from 'src/app/models/credit-card-model';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { RentalPost } from 'src/app/models/rentalPost';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number;
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  years: number[] = [];
  rental: Rental;
  cars: Car[] = [];
  car: Car;
  payment: Payment;
  rentedDays: number[] = [];
  calculatedRentPrice: number[] = [];
  rememberCreditCardCheck: any;
  creditCardForm: FormGroup;
  creditCardModel: CreditCardModel;
  creditCards: CreditCardModel[] = [];
  enterCardOrNot: boolean = false;

  constructor(private carDetailService: CarService,
    private router: Router, private toastrService: ToastrService, private paymentService: PaymentService,
    private rentalService: RentalService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.authService.userDetailFromToken();
    this.createYearsArray();
    this.carsFromStorage();
    this.getCarDetail();
    this.createCreditCardForm();
    this.getUserCreditCards();
  }

  carsFromStorage() {
    let items = this.localStorageService.get('cart');
    this.cartItems = (items) ? JSON.parse(items) : [];
  }

  createYearsArray() {
    let currentYear: number = new Date().getFullYear();
    for (let i = currentYear; i <= currentYear + 15; i++) {
      this.years.push(i);
    }
  }

  selectCardDetail(value: number) {
    if (value === 1) {    
      return this.enterCardOrNot = true;
    } else{
      return this.enterCardOrNot = false;
    }
  }

  getCarDetail() {
    this.cartItems.forEach(item => {
      this.carDetailService.getCarByIdDetail(item.rental.carId).subscribe(response => {
        this.car = response.data[0];
        if (item.rental.returnDate != null) {
          var rentDate = new Date(item.rental.rentDate);
          var returnDate = new Date(item.rental.returnDate);
          var difference = returnDate.getTime() - rentDate.getTime();
          var calculatedDays = Math.ceil(difference / (1000 * 3600 * 24));
          this.rentedDays.push(calculatedDays);
        } else {
          var calculatedDays = 0;
          this.rentedDays.push(calculatedDays)
        }
        this.calculatedRentPrice.push(calculatedDays * this.car.dailyPrice);
        this.cars.push(this.car);
      });
    });
  }

  getCart() {
    this.cartItems = this.paymentService.listCart();
  }

  deleteItemFromCart(car: Car) {
    let item: CartItem = this.cartItems.find(c => c.rental.carId == car.carId)!;
    let itemIndex = this.cartItems.indexOf(item);
    this.cartItems.splice(itemIndex, 1);
    this.cars.splice(itemIndex, 1);
    this.rentedDays.splice(itemIndex, 1);
    this.calculatedRentPrice.splice(itemIndex, 1);

    if (this.cars.length === 0) {
      this.localStorageService.remove('cart');
    } else {
      this.localStorageService.remove('cart');
      this.localStorageService.add('cart', JSON.stringify(this.cars));

    }

  }

  postRent(cartItem: CartItem) {

    let rental: RentalPost = {
      carId: cartItem.rental.carId,
      customerId: cartItem.rental.customerId,
      rentDate: cartItem.rental.rentDate,
      returnDate: cartItem.rental.returnDate ? cartItem.rental.returnDate : null,

    }
    this.rentalService.postRentAdd(rental).subscribe(response => {
    }, responseError => {
      this.toastrService.error("Kiralama işlemi gerçekleşemedi.");
    })
  }

  postPayment() {
    let isSuccessPay = true;
    this.cartItems.forEach(cartItem => {
      if (cartItem.rental.returnDate != null) {
        var rentDate = new Date(cartItem.rental.rentDate);
        var returnDate = new Date(cartItem.rental.returnDate);
        var difference = returnDate.getTime() - rentDate.getTime();
        var calculatedDays = Math.ceil(difference / (1000 * 3600 * 24));
      } else {
        var calculatedDays = 0;
      }
      let carFind = this.cars.find(r => r.carId == cartItem.rental.carId);
      let carDailyPrice = carFind?.dailyPrice ? carFind.dailyPrice : 1;
      let payment: Payment = {
        carId: cartItem.rental.carId,
        userId: cartItem.rental.customerId,
        totalAmount: carDailyPrice * calculatedDays
      }
      this.paymentService.addPayment(payment).subscribe(response => {
        if (response.success == true) {
          this.postRent(cartItem);
          isSuccessPay = true;
          if (this.rememberCreditCardCheck) {
            this.saveCreditCard();
          } else {
            console.log("kart kaydedilmedi");
          }

        } else {
          isSuccessPay = false;
        }
      });
    })

    if (isSuccessPay) {
      this.toastrService.success("Ödeme işlemi gerçekleşti.");
      this.cars = [];
      this.localStorageService.remove('cart');
      this.toastrService.info("Araç kiralama başarıyla tamamlandı ana sayfaya dönüyorsunuz.");
      this.router.navigate(['/cars']);
    } else {
      this.toastrService.success("Ödeme esnasında bir problem oluştu.");
      this.router.navigate(['/cars']);
    }
  }

  removeAllItemsFromCart() {
    this.cars = [];
    this.localStorageService.remove('cart');
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardName: ["", Validators.required],
      cardNumber: ["", Validators.required],
      cardYear: ["", Validators.required],
      cardMonth: ["", Validators.required],
      cardCvv: ["", Validators.required],
      nameOnCard: ["", Validators.required],
      userId: [""],
    })
  }

  saveCreditCard() {
    if (this.creditCardForm.valid) {
      this.creditCardForm.patchValue({
        userId: parseInt(this.authService.userId.toString())
      })
      this.creditCardModel = Object.assign({}, this.creditCardForm.value);
      console.log(this.creditCardModel);
      this.creditCardService.postAdd(this.creditCardModel).subscribe(response => {
        this.toastrService.success('Kart başarıyla kaydedildi');
      }, responseError => {
        //this.toastrService.error(responseError.Errors.error);
        console.log(responseError);

      })
    }
  }

  getUserCreditCards() {
    this.creditCardService.getCardsById(this.authService.userId).subscribe(response => {
      this.creditCards = response.data
    })
  }
}
