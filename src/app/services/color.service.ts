import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44303/api"

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl+"/colors/getall");
  }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/colors/add", color);
  }

  getSingleColor(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl+ "/colors/getbyid?id=" + colorId
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

  update(color:Color):Observable<SingleResponseModel<Color>>{
    return this.httpClient.post<SingleResponseModel<Color>>(this.apiUrl+ "/colors/update", color);
  }
}
