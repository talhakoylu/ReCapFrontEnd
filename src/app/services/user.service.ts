import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/global-constants';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { RoleModel } from '../models/role';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getByEmail(email: string): Observable<SingleResponseModel<UserModel>> {
    return this.httpClient.get<SingleResponseModel<UserModel>>(GlobalConstants.apiUrl + "users/getbyemail?email=" + email);
  }
  getUserRoles(id: number): Observable<ListResponseModel<RoleModel>> {
    return this.httpClient.get<ListResponseModel<RoleModel>>(GlobalConstants.apiUrl + "users/userclaims?user=" + id);
  }

  getUserById(id: number): Observable<SingleResponseModel<UserModel>> {
    return this.httpClient.get<SingleResponseModel<UserModel>>(GlobalConstants.apiUrl + "users/getbyid?id=" + id);
  }

  postUserUpdate(user: UserModel, password: string ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + 'users/update', {user, password});
  }
}
