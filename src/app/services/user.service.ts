import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44303/api/users"

  constructor(private httpClient:HttpClient) { }

  getById(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl+ "/getbyid?id=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getByEmail(email:string):Observable<User>{
    return this.httpClient.get<User>(this.apiUrl+"/getbyemail?email="+email);
  }

  update(user:User):Observable<SingleResponseModel<User>>{
    console.log(user)
    return this.httpClient.post<SingleResponseModel<User>>(this.apiUrl+"/update?password="+user.password, user);
  }
}
