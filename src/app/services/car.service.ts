import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarStandart } from '../models/car-standart';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44327/api/";
  constructor(private httpClient:HttpClient) { }

  getCars() : Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getalldetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number) : Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrand?id=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number) : Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbycolor?id=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByIdDetail(carId: number) : Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbyiddetail?id=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId: number) : Observable<SingleResponseModel<CarStandart>>{
    let newPath = this.apiUrl + "cars/getbyid?id="+carId;
    return this.httpClient.get<SingleResponseModel<CarStandart>>(newPath);
  }

  getCarsByColorAndBrand(colorId:number, brandId:number) : Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbycolorandbrandid?colorId="+colorId+"&brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  addCar(car: CarStandart) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  updateCar(car: CarStandart) : Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.post<ResponseModel>(newPath, car);
  }
}
