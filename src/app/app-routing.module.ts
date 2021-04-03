import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/getcardetail/:carId", component:CarDetailComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"rental/:carId", component:RentalComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"brands/getall", component:BrandListComponent},
  {path:"colors/getall", component:ColorListComponent},
  {path:"cars/getall", component:CarListComponent},
  {path:"brands/getBrandDetail/:brandId", component:BrandUpdateComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
