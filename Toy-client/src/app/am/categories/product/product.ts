import { Category } from "../category/category";
import { Manufacturer } from "../manufacturer/Manufacturer";

/** 
 * the amphitheater class
*/
export class Product {
    /** the id of the amphitheater */
    idProduct: number;
    /** the name of the amphitheater */
    nameProduct: string
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
    descriptionProduct:string;
    priceProduct:number;
    lenghtProduct:number;
    amountProduct:number;
    widthProduct:number;
    heightProduct:number;
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