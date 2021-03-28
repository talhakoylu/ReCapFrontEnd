import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/global-constants';
import { CompanyRequestModel } from '../models/company-request-model';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient : HttpClient) { }

  getCustomers() : Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(GlobalConstants.apiUrl + "customers/getalldetail");
  }

  getById(id: number) : Observable<SingleResponseModel<CompanyRequestModel>>{
    return this.httpClient.get<SingleResponseModel<CompanyRequestModel>>(GlobalConstants.apiUrl + "customers/getbyid?id=" + id);
  } 

  addCustomer(companyRequest: CompanyRequestModel): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "customers/add", companyRequest);
  }
}
