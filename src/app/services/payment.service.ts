import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44303/api/creditcards"

  constructor(private httpClient:HttpClient) { }

  pay(pay:Rental, carId:number):Observable<ResponseModel>{
    pay.carId = carId;
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add", pay);
  }
}
