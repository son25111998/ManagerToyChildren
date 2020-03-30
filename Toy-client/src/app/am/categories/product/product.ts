import { Category } from "../category/category";
import { Manufacturer } from "../manufacturer/Manufacturer";


export class Product {
    id: number;
    name: string
    description:string;
    price:number;
    thumbai:String='';
    lenght:number;
    amount:number;
    width:number;
    height:number;
    createTime: Date;

    createdBy: string;

    updateTime: Date;

    updatedBy: string;
    manufacturer: number;

    statuss: number;
    checked: boolean;
    category:Category;
    manfacturer:Manufacturer;
}