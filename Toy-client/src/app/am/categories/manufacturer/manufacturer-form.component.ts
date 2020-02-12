import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Manufacturer } from './Manufacturer';
import { Constants } from '../../common/util/constants';

/**
 * @description: Define the country form. Use for enter data of the country object
 */
export class ManufacturerForm {
    /**
     * @description Define the country form
     * @param fb
     */
    static ManufacturerForm(fb: FormBuilder, business: string): FormGroup {
        var ManufacturerForm: FormGroup;
        ManufacturerForm = fb.group({
            id: "",

            // classroom: fb.group({
            //     idClassroom: [0, Validators.compose([
            //         Validators.required,
            //         Validators.min(1),
            //     ])]

            // }),
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
            // createTime: ["", Validators.compose([
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
            description: [1, Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
            statuss: [1, Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
        });
        return ManufacturerForm;
    }

    /**
     * @description : set the inital value for the form
     * @param deviceForm : country form
     * @param country : Data used to set up for form
     */
    static bindingData(manufacturerForm: FormGroup, manufacturer: Manufacturer) {
        debugger
        manufacturerForm.patchValue({
            id: manufacturer.id,
            // classroom: Device.classroom,
            // idClassroom: Device.classroom.idCategory,
            name: manufacturer.name,
            description: manufacturer.description,
            statuss: manufacturer.statuss,
            // amount: Device.amount,
            // creationTime: Device.createTime,
            // createdBy: Device.createdBy,
            // updateTime: Device.updateTime,
            // updatedBy: Device.updatedBy,
            // statuss: Device.statuss,
        });

    }
}
