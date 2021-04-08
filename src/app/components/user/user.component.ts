import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userUpdateForm:FormGroup;
  email = this.localStorageService.get("email");
  password:FormControl;
  user: User = new User();

  constructor(private userService:UserService, private formBuilder:FormBuilder, private toastrService:ToastrService, private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createUserUpdateForm();
    this.getUser();
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      userId:this.user.userId,
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      email:["", Validators.required],
      password:["", Validators.required]

    })
  }

  getUser(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response => {
        this.user = response;
      })
    }
  }

  update(){
    if(this.userUpdateForm.valid){
      let userModel = Object.assign({}, this.userUpdateForm.value)
      this.userService.update(userModel).subscribe(response => {
        this.toastrService.success(response.message, "Successful")
      }, responseError => {
        if(responseError.error.ValidationError.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++){
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Validation Error")
          }
        }
      })
    }else{
      this.toastrService.error("Your form is incomplete");
    }
  }

}
