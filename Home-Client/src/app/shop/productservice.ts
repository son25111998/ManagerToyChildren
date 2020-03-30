import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';


import { Product } from '../homepage/product';
import { Router } from '@angular/router';

import { concatStatic } from 'rxjs/operator/concat';
import { CommonService } from '../../app/util/common-service/common.service';
import { Constants } from '../../app/util/constants';
import { HeaderField } from '../../app/util/header-field';
import { HeaderValue } from '../../app/util/header-value';

@Injectable()
export class ProductService extends CommonService {

    ProductApi = Constants.BASE_URL + "/product-management/managed-product";
    ManufacturerApi = Constants.BASE_URL + "/manufacturer-management/managed-manufacturer";
    CategoryApi = Constants.BASE_URL + "/category-management/managed-category";

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
    getPageProduct(product: Product, page: number): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        let secureHeaders = new Headers();

        // secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        // secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        debugger;
        var promise = this.http.post(this.ProductApi + "/advance-search?page=" + page+ "&size=" + Constants.PAGE_SIZE, product, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    public getListProduct(): Promise<any> {
        //  let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        //secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        //secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "/all", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    public getListProductSortAsc(): Promise<any> {
        //  let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        //secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        //secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "/sort-price/asc", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    public getListProductSortDesc(): Promise<any> {
        //  let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        //secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        //secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "/sort-price", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    getListManufacturer(): Promise<any> {
        //  let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        //secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        //secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ManufacturerApi + "/all", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    getListCategory(): Promise<any> {
        //  let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        //secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        //secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.CategoryApi + "/all", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    findidCategory(id: number): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        // secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        // secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "/find-idCategory/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    findidManufacturer(id: number): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        // secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        // secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "/find-idManufacturer/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
