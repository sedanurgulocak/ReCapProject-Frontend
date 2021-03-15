import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import {HttpClient} from '@angular/common/http'
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarDetailDtoResponseModel } from 'src/app/models/carDetailDtoResponseModel';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  apiUrl = "https://localhost:44303/api/cars/getall"

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.httpClient.get<CarResponseModel>(this.apiUrl).subscribe(response => {
      this.cars = response.data;
    });
  }


}
