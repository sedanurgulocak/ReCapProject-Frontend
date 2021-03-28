import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44303/api/rentals"

  constructor(private httpClient:HttpClient) { }

  add(rental:Rental, carId:number):Observable<ResponseModel>{
    rental.carId = carId;
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add", rental);
  }

  // getRentals():Observable<ListResponseModel<RentalDetailDto>>{
  //   let newPath = this.apiUrl + "/getrentaldetaildtos"
  //   return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  // }

  // getRentalDetailByCarId(carId : number):Observable<ListResponseModel<RentalDetailDto>>{
  //   let newPath = this.apiUrl + "/getrentaldetailsbyid?id=" + carId
  //   return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  // }
}
