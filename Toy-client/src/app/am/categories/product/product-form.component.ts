import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Product } from './product';
import { Constants } from '../../common/util/constants';

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
            id: "",
            idProduct: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.CODE_PATTERN)
            ])],
            nameProduct: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
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
    static bindingData(productForm: FormGroup, Product: Product) {
        debugger
        productForm.patchValue({
            idProduct: Product.idProduct,
            nameProduct: Product.nameProduct,
           // statuss: Amphitheater
        });

    }
}
