import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Account } from './account';
import { Constants } from '../../common/util/constants';

/**
 * @description: Define the country form. Use for enter data of the country object
 */
export class AccountForm {
    /**
     * @description Define the country form
     * @param fb
     */
    static AccountForm(fb: FormBuilder, business: string): FormGroup {
        var AccountForm: FormGroup;

        AccountForm = fb.group({
            id: "",
            username: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
            role_id: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
            password: ["", Validators.compose([
                //Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],

            email: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(100000),
                Validators.pattern(Constants.EMAIL_PATTERN)
            ])],

            // categoryId: ["", Validators.compose([
            //     Validators.required,
            // ])],
            // category: fb.group({
            //     id: [null, Validators.compose([
            //         Validators.required,
            //         Validators.min(1)
            //     ])],
            //     name: ["", Validators.compose([
            //         Validators.required,
            //         Validators.maxLength(50),
            //         Validators.pattern(Constants.NAME_PATTERN)
            //     ])],
            // }),
            // manfactureId: ["", Validators.compose([
            //     Validators.required,
            // ])],
            // manfacturer: fb.group({
            //     id: [null, Validators.compose([
            //         Validators.required,
            //         Validators.min(1)
            //     ])],
            //     name: ["", Validators.compose([
            //         Validators.required,
            //         Validators.maxLength(50),
            //         Validators.pattern(Constants.NAME_PATTERN)
            //     ])],
            // }),
            active: [1, Validators.compose([
                Validators.required
            ])],

            // englishName: ["", Validators.compose([
            //     Validators.required,
            //     Validators.maxLength(50),
            //     Validators.pattern(Constants.NAME_PATTERN)
            // ])],
        });

        return AccountForm;
    }

    /**
     * @description : set the inital value for the form
     * @param countryForm : country form
     * @param country : Data used to set up for form
     */
    static bindingData(accountForm: FormGroup, Account: Account) {
        debugger
        accountForm.patchValue({
            id: Account.id,
            username: Account.username,
            email: Account.email,
            password: Account.password,
            role_id: Account.role_id,
            active: Account.active,
            // category:{
            //     id: Product.category.id,
            //     name: Product.category.name,
            // },
            // manfacturer: {
            //     id: Product.manfacturer.id,
            //     name: Product.manfacturer.name,
            // },
            // statuss: Product.statuss,

            // statuss: Amphitheater
        });

    }
}
