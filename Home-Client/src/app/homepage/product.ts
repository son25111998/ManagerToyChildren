// import { Category } from "../category/category";
// import { Manufacturer } from "../manufacturer/Manufacturer";

/** 
 * the amphitheater class
*/
export class Product {
    id: number;
    name: string;
    thumbai: string
    description:string;
    price:number;
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
    // category:Category;
    // manfacturer:Manufacturer;
}