import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Product } from '../homepage/product';
import { Constants } from '../util/constants';

/**
 * @description: Define the country form. Use for enter data of the country object
 */
export class ProductForm {
    /**
     * @description Define the country form
     * @param fb
     */
    static ProductForm(fb: FormBuilder, business: string): FormGroup {
        var ProductForm: FormGroup;

        ProductForm = fb.group({
            //id: "",
            id: null,
            name: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
            price: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            amount: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            lenght: ["", Validators.compose([
                //Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            width: ["", Validators.compose([
                //Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            description: ["", Validators.compose([
                // Validators.required,
                //Validators.maxLength(100000),
                //Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            height: ["", Validators.compose([
                // Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            categoryId: ["", Validators.compose([
                Validators.required,
            ])],
            category: fb.group({
                id: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])],
                name: ["", Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern(Constants.NAME_PATTERN)
                ])],
            }),
            thumbai: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
            manufacturerId: ["", Validators.compose([
                Validators.required,
            ])],
            manfacturer: fb.group({
                id: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])],
                name: ["", Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern(Constants.NAME_PATTERN)
                ])],
            }),
            createTime: ["", Validators.compose([
                Validators.required,
            ])], 
            statuss: [1, Validators.compose([
                Validators.required
            ])],

            // englishName: ["", Validators.compose([
            //     Validators.required,
            //     Validators.maxLength(50),
            //     Validators.pattern(Constants.NAME_PATTERN)
            // ])],
        });

        return ProductForm;
    }

    /**
     * @description : set the inital value for the form
     * @param countryForm : country form
     * @param country : Data used to set up for form
     */
    static bindingData(productForm: FormGroup, product: Product) {
        debugger
        productForm.patchValue({
            id: product.id,
            name: product.name,
            amount: product.amount,
            lenght: product.lenght,
            width: product.width,
            height: product.height,
            createTime:product.createTime,
            thumbai:product.thumbai,
            price:product.price,
            description:product.description,
            // category:{
            //     id: product.category.id,
            //     name: product.category.name,
            // },
            // manfacturer: {
            //     id: product.manfacturer.id,
            //     name: product.manfacturer.name,
            // },
            statuss: product.statuss,

            // statuss: Amphitheater
        });

    }
}
