// import { Category } from "../category/category";
// import { Manufacturer } from "../manufacturer/Manufacturer";

/** 
 * the amphitheater class
*/
export class Product {
    /** the id of the amphitheater */
    id: number;
    /** the name of the amphitheater */
    name: string
    /** the create time of the amphitheater */
    // createTime: Date;
    // /** the update name of the amphitheater */
    // createdBy: string;
    // /** the update time of the amphitheater */
    // updateTime: Date;
    // /** the date update of the amphitheater */
    // updatedBy: string;
    // /** the status of the amphitheater */
    // statuss: string;
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