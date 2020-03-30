import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../common/util/constants';
import { OperationHistory } from './operation_history';


/**
 * @description: Define the province form. Use for enter data of the province object
 */
export class OperationHistoryForm {
    /**
     * @description Define the province form
     * @param fb 
     */
    static operationHistoryForm(fb: FormBuilder, business: string): FormGroup {
        var operationHistoryForm: FormGroup;

        operationHistoryForm = fb.group({
            id: null,
            action: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.CODE_PATTERN)
            ])],
            date_action: ["", Validators.compose([
                Validators.required,
                Validators.pattern(Constants.NAME_PATTERN)
            ])], 
            detail_action: ["", Validators.compose([
                Validators.required,
                Validators.pattern(Constants.NAME_PATTERN)
            ])], 
            module: ["", Validators.compose([
                Validators.required,
                Validators.pattern(Constants.NAME_PATTERN)
            ])], 
            user_name: ["", Validators.compose([
                Validators.required,
                Validators.pattern(Constants.NAME_PATTERN)
            ])], 
            record_id: ["", Validators.compose([
                Validators.required,
                Validators.pattern(Constants.NAME_PATTERN)
            ])], 
            status: ["", Validators.compose([
                Validators.required
            ])], 
            startDate: ["", Validators.compose([
                Validators.required,
            ])], 
            endDate: ["", Validators.compose([
                Validators.required,
            ])], 
            product: ["", Validators.compose([
                Validators.required,
            ])], 
            account: ["", Validators.compose([
                Validators.required,
            ])], 
            category: ["", Validators.compose([
                Validators.required,
            ])], 
        });
        return operationHistoryForm;
    }

    static bindingData(operationHistoryForm: FormGroup, operationHistory: OperationHistory) {
        
        operationHistoryForm.patchValue({
            id: operationHistory.id,
            action: operationHistory.action,
            date_action: operationHistory.date_action,

            detail_action: operationHistory.detail_action,
            module: operationHistory.module,
            user_name: operationHistory.user_name,
            record_id: operationHistory.record_id,
            product: operationHistory.product
        });
        
    }
}