import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

   rentalAddForm : FormGroup;
   carId:number;
   carDetails: CarDetailDto[]=[];
   customers: Customer[]=[];
   companyName: string;
   customerId: number;

  constructor(
    private rentalService:RentalService, 
    private carService:CarService, 
    private customerService:CustomerService, 
    private activatedRoute:ActivatedRoute, 
    private formBuilder:FormBuilder, 
    private toastrService:ToastrService) { }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe(params => {
       if(params ["carId"]){
         this.carId = parseInt(params["carId"]);
         this.getActiveCarDetail(params["carId"]);
       }
     })
     this.getCustomers();
    this.createRentalAddForm();

    
  }

  getCustomers(){
    debugger;
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      console.log(response.data);
    });
  }

  getActiveCarDetail(carId: number){
     this.carService.getSingleCar(carId).subscribe((response) => {
       this.carDetails = response.data;
       console.log(this.carDetails);
     });
   }

  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    })
  }

  add(){
    if(this.rentalAddForm.valid){
      this.activatedRoute.params.subscribe(params => {
        if(params ["carId"]){
          this.carId = parseInt(params["carId"]);
        }
      })
      let rentalModel = Object.assign({}, this.rentalAddForm.value)
      this.rentalService.add(rentalModel,this.carId).subscribe(response =>{
        this.toastrService.success(response.message);
        }, responseError => {
          this.toastrService.error(responseError.error.message);
      })
    }else{
      this.toastrService.error("Formunuz eksik");
    }
  }

  // getRentals(){
  //   this.rentalService.getRentals().subscribe(response => {
  //     this.rentals=response.data;
  //     this.dataLoaded=true;
  //   })
  // }

  //  getRentalBycarId(carId:number){
  //    this.rentalService.getRentalDetailByCarId(carId).subscribe(response => {
  //      this.rentals = response.data;
  //      this.dataLoaded = true;
  //    })
  //  }
}
