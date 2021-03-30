import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/common/global-constants';
import { FindeksModel } from '../models/findeks-model';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  constructor(
    private httpClient: HttpClient
  ) { }

  postAdd(findeksModel: FindeksModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(GlobalConstants.apiUrl + "findeks/add", findeksModel);
  }

  getByUserId(id: number): Observable<SingleResponseModel<FindeksModel>>{
    return this.httpClient.get<SingleResponseModel<FindeksModel>>(GlobalConstants.apiUrl + "findeks/getbyuserid?id=" + id);
  }
}
