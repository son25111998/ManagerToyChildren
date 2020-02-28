import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from './category';

import { Product } from '../product/product';
import { Constants } from '../../common/util/constants';

/**
 * @description: Define the country form. Use for enter data of the country object
 */
export class CategoryForm {
    /**
     * @description Define the country form
     * @param fb
     */
    static categoryForm(fb: FormBuilder, business: string): FormGroup {
        var categoryForm: FormGroup;

        categoryForm = fb.group({
            // id: 0,
            id: "",

            // name: fb.group({
            //     idAmphitheater: [1, Validators.compose([
            //         Validators.required,
            //         Validators.min(1)
            //     ])]
            // }),
            // device: fb.group({
            //     deviceId: [0, Validators.compose([
            //         Validators.required,
            //         Validators.min(1)
            //     ])]
            // }),
            // symbol: ["", Validators.compose([
            //     Validators.required,
            //     Validators.maxLength(50),
            //     Validators.pattern(Constants.NAME_PATTERN)
            // ])],
            name: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
            // amount: ["", Validators.compose([
            //     Validators.required,
            //     Validators.maxLength(50),
            //     Validators.pattern(Constants.NAME_PATTERN)
            // ])],
            // size: ["", Validators.compose([
            //     Validators.required,
            //     Validators.maxLength(50),
            //     Validators.pattern(Constants.NAME_PATTERN)
            // ])],
            // chucNang: ["", Validators.compose([
            //     Validators.required,
            //     Validators.maxLength(50),
            //     Validators.pattern(Constants.NAME_PATTERN)
            // ])],
            // creationTime: ["", Validators.compose([
            //     Validators.required,
            //     Validators.maxLength(50),
            //     Validators.pattern(Constants.NAME_PATTERN)
            // ])],
            // createdBy: ["", Validators.compose([
            //     Validators.required,
            //     Validators.maxLength(50),
            //     Validators.pattern(Constants.NAME_PATTERN)
            // ])],
            // updatedBy: ["", Validators.compose([
            //     Validators.required,
            //     Validators.maxLength(50),
            //     Validators.pattern(Constants.NAME_PATTERN)
            // ])],
            statuss: [1, Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
        });
        return categoryForm;
    }

    /**
     * @description : set the inital value for the form
     * @param countryForm : country form
     * @param country : Data used to set up for form
     */
    static bindingData(categoryForm: FormGroup, category: Category) {
        debugger
        categoryForm.patchValue({
            id:category.id,
            name:category.name,
            // idClassroom: Category.idCateg,
            // // amphitheater: Category.amphitheater,
            // // // staffInCharge: Classroom.staffInCharge,
            // // symbol: Category.symbol,
            // nameClassroom: Category.nameClassroom,
            // amount: Category.amount,
            // size: Category.size,
            // chucNang: Category.chucNang,
            // creationTime: Category.createTime,
            // createdBy: Category.createdBy,
            // updateTime: Classroom.updateTime,
            // updatedBy: Category.updatedBy,
            // statuss: Category.statuss,
        });

    }
}
