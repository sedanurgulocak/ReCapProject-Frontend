import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color;
  path:string="https://localhost:44303";

  colorUpdateForm : FormGroup

  constructor(private colorService:ColorService, private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {this.activatedRoute.params.subscribe(params => {
    if(params["colorId"]){
      this.getColorDetail(params["colorId"])
    }
  })
    this.createColorUpdateForm();
  }

  getColorDetail(colorId:number){
    this.colorService.getSingleColor(colorId).subscribe(response => {
      this.color = response.data;
      console.log(response);
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:["", Validators.required],
      colorName:["", Validators.required]
    })
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({}, this.colorUpdateForm.value)
      this.colorService.update(colorModel).subscribe(response => {
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
