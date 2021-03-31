export interface Rental{
    rentalId:number;
    carId:number;
    customerId:number;
    rentDate:Date;
    returnDate:Date;
    nameOnTheCard:string,
    cardNumber : string,
    cvv:string,
    amountPay:number
}