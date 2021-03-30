import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/global-constants';
import { CreditCardModel } from '../models/credit-card-model';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(
    private httpClient: HttpClient
  ) { }

  postAdd(creditCard: CreditCardModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "usercreditcards/add", creditCard);
  }

  getCardsById(id: number): Observable<ListResponseModel<CreditCardModel>> {
    return this.httpClient.get<ListResponseModel<CreditCardModel>>(GlobalConstants.apiUrl + "usercreditcards/getallbyid?id=" + id);
  }
}
