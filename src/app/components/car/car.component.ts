import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  carDetails:CarDetailDto[] = []
  dataLoaded = false;
  
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarByFilter(params["brandId"],params["colorId"])
      }
      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else if(params["carId"]){
        this.getCarByCarId(params["carId"])
      }
      else{
        this.getCars()
      }
    })

  }

  getCars(){
    this.carService.getCars().subscribe(response => {
      this.carDetails=response.data
      this.dataLoaded = true;
    })
  }

  getCarByFilter(brandId:number, colorId:number){
    this.carService.getCarsByBrandIdAndColorId(brandId, colorId).subscribe(response => {
      this.carDetails = response.data,
      this.dataLoaded = true
      if(this.carDetails.length == 0){
        this.toastr.info('No cars found');
      }
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.carDetails=response.data
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.carDetails=response.data
      this.dataLoaded = true;
    })
  }

  getCarByCarId(carId:number){
    this.carService.getCarByCarId(carId).subscribe(response => {
      this.carDetails=response.data
      this.dataLoaded = true;
    })
  }

}
