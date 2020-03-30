import { OrderDetail } from "./OderDetail";

export class Order {
    id: number;
    dateOrder: Date;
    paymentType:number;
    couponId:number;
    shippingId:number;
    customerId:number;
    taxId:number;
    orderDetailEntity:OrderDetail;
    status:number;
    checked: boolean;
}