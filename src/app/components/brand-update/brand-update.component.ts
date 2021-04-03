import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand;
  path:string="https://localhost:44303";
  brandId:number;
  brandName:string;

  brandUpdateForm : FormGroup;

  constructor(private brandService:BrandService, private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {this.activatedRoute.params.subscribe(params => {
    if(params["brandId"]){
      this.getBrandDetail(params["brandId"])
    }
  })
  this.createBrandUpdateForm();

  }

  getBrandDetail(brandId:number){
    this.brandService.getSingleBrand(brandId).subscribe(response => {
      this.brand = response.data;
      console.log(response);
    })
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId:["", Validators.required],
      brandName:["", Validators.required]
    })
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({}, this.brandUpdateForm.value)
      this.brandService.update(brandModel).subscribe(response => {
        this.toastrService.success(response.message, "Successful")
      }, responseError => {
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Validation Error")
            
          }
        }
      })
    }else{
      this.toastrService.error("Your form is incomplete");
    }
  }

}
