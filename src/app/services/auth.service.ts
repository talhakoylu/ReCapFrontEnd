import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/common/global-constants';
import { LoginModel } from '../models/login-model';
import { RegisterModel } from '../models/register-model';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token-model';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(GlobalConstants.apiUrl + "auth/login", loginModel);
  }

  register(registerModel: RegisterModel) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "auth/register", registerModel);
  }

  isAuthenticated(): boolean{
    return this.localStorageService.checkExistsOrNot("token");
  }

  logout(){
    this.localStorageService.clean();
    this.router.navigateByUrl('/');
  }

}
