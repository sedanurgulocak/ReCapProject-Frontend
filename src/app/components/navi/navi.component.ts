import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  email = this.localStorageService.get("email");
  user:User = new User() ;

  constructor(private authService:AuthService, private localStorageService:LocalStorageService, private toastrService:ToastrService, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.checkToLogin();
    this.checkToEmail();
    this.getEmail();
  }

  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }

  checkToEmail(){
    if(this.localStorageService.get("email")){
      return true;
    }else{
      return false;
    }
  }

  getEmail(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response =>{
        this.user = response;
      })
    }
  }

  logOut(){
    this.localStorageService.clean()
    this.toastrService.success("Logout")
    this.router.navigate(["/cars"])
  }

}
