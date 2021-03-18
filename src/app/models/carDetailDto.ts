import { CarImage } from "./carImage";

export interface CarDetailDto{
    id:number;
    brandName:string;
    colorName:string;
    descriptions:string;
    dailyPrice:number;
    carImageDate:Date;
    imagePath:string;
    carImages:CarImage[];
}