import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {  Order} from './order';
import {  OrderDetail} from './OderDetail';
import { Constants } from '../../common/util/constants';

/**
 * @description: Define the country form. Use for enter data of the country object
 */
export class OrderForm {
    /**
     * @description Define the country form
     * @param fb
     */
    static OrderForm(fb: FormBuilder, business: string): FormGroup {
        var OrderForm: FormGroup;

        OrderForm = fb.group({
            //id: "",
            id: null,
            dateOrder: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
            ])],
            paymentType: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            couponId: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            shippingId: ["", Validators.compose([
                //Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            customerId: ["", Validators.compose([
                //Validators.required,
                Validators.maxLength(10),
                Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            taxId: ["", Validators.compose([
                // Validators.required,
                //Validators.maxLength(100000),
                //Validators.pattern(Constants.NUMBER_PATTERN)
            ])],
            oderDetail: fb.group({
                id: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])],
                productId: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])],
                attribute: ["", Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern(Constants.NAME_PATTERN)
                ])],
                quantity: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])],
                
            }),
            productId: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            attribute: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Constants.NAME_PATTERN)
            ])],
            quantity: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
        
            status: ["", Validators.compose([
                Validators.required,
            ])],
        });

        return OrderForm;
    }

    /**
     * @description : set the inital value for the form
     * @param countryForm : country form
     * @param country : Data used to set up for form
     */
    static bindingData(oderForm: FormGroup, order: Order) {
        debugger
        oderForm.patchValue({
            id: order.id,
            dateOrder: order.dateOrder,
            paymentType: order.paymentType,
            couponId: order.couponId,
            shippingId: order.shippingId,
            customerId: order.customerId,
            taxId:order.taxId,
            oderDetail:order.orderDetailEntity,
            productId:order.orderDetailEntity.productId,
            attribute:order.orderDetailEntity.attribute,
            quantity:order.orderDetailEntity.quantity,
        });

    }
}
