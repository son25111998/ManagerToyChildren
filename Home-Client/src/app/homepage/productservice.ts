import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';


import { Product } from './product';
import { Router } from '@angular/router';

import { concatStatic } from 'rxjs/operator/concat';
import { CommonService } from '../../app/util/common-service/common.service';
import { Constants } from '../../app/util/constants';
import { HeaderField } from '../../app/util/header-field';
import { HeaderValue } from '../../app/util/header-value';

@Injectable()
export class ProductService extends CommonService {

    ProductApi = Constants.BASE_URL + "/product-management/managed-product";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }
    findOne(id: number): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        // secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        // secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "/find-id/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    getPageProduct(page: number): Promise<any> {
        debugger
        // let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        // secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        //secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "?page=" + page + "&size=" + Constants.PAGE_SIZE, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    public getListProduct(): Promise<any> {
         let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "/all", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    createToCart(): Promise<any> {
        // amphitheater.status = "1";
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(Constants.BASE_URL+"/shoppingcart-management/managed-shoppingcart",
             { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }


}
