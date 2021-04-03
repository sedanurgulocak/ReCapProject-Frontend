import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car:Car;
  path:string="https://localhost:44303";

  carUpdateForm : FormGroup;

  constructor(private carService:CarService, private activateRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {this.activateRoute.params.subscribe(params => {
    if(params["carId"]){
      this.getCarDetail(params["carId"])
    }
  })
  this.createCarUpdateForm();
  }

  getCarDetail(carId:number){
    this.carService.getCarDetailForUpdate(carId).subscribe(response => {
      this.car = response.data;
      console.log(response);
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id:["", Validators.required],
      brandId:["", Validators.required],
      colorId:["", Validators.required],
      modelYear:["", Validators.required],
      dailyPrice:["", Validators.required],
      descriptions:["", Validators.required]
    })
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({}, this.carUpdateForm.value)
      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success(response.message, "Successful")
      }, responseError => {
        if(responseError.error.ValidationErrors.lenght>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Validation Error")
            
          }
        }
      })
    }else{
      this.toastrService.error("Your from is incomplete");
    }
  }
}
