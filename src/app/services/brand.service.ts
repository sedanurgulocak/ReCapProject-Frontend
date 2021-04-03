import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44303/api"

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"/brands/getall");
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/brands/add", brand);
  }

  getSingleBrand(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath = this.apiUrl + "/brands/getbyid?id=" + brandId
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }
}
