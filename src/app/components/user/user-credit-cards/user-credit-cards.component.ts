import { Component, OnInit } from '@angular/core';
import { CreditCardModel } from 'src/app/models/credit-card-model';
import { AuthService } from 'src/app/services/auth.service';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-user-credit-cards',
  templateUrl: './user-credit-cards.component.html',
  styleUrls: ['./user-credit-cards.component.css']
})
export class UserCreditCardsComponent implements OnInit {

  creditCards: CreditCardModel[] = [];
  constructor(
    private authService: AuthService,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.authService.userDetailFromToken();
    this.getCards();
  }

  getCards(){
    this.creditCardService.getCardsById(this.authService.userId).subscribe(response => {
      this.creditCards = response.data;
    })
  }
}
