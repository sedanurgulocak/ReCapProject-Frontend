import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:CarDetailDto[]=[];
  carImages:CarImage[]=[];
  path:string="https://localhost:44303";

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private carImageService:CarImageService) { }

  ngOnInit(): void {this.activatedRoute.params.subscribe(params=>{
    if(params["carId"]){
        this.getCarDetail(params["carId"])
        this.getCarImagesByCarId(params["carId"])
      }
  })
    
  }

  getCarDetail(carId:number){
    this.carService.getSingleCar(carId).subscribe(response => {
      //this.carDetails=response.data;
      this.carDetails = response.data;
      console.log(response.data);
    })
  }
    
  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response =>{
      this.carImages=response.data;
    })
  }
}
  
