import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/global-constants';
import { LoginModel } from '../models/login-model';
import { RegisterModel } from '../models/register-model';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(GlobalConstants.apiUrl + "auth/login", loginModel);
  }

  register(registerModel: RegisterModel) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "auth/register", registerModel);
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }else{
      return false;
    }
  }
}
