import { CarImage } from "./carImage";

export interface CarDetailDto{
    id:number;
    brandName:string;
    colorName:string;
    descriptions:string;
    dailyPrice:number;
    modelYear:string;
    carImageDate:Date;
    imagePath:string[];
    carImages:CarImage[];
}