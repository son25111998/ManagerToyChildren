import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';


import { Account } from './account';
import { Router } from '@angular/router';

import { concatStatic } from 'rxjs/operator/concat';
import { CommonService } from '../../common/util/common-service/common.service';
import { Constants } from '../../common/util/constants';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';

/**
 * Examine the handling  of business requirements with Country module
 */
@Injectable()
export class AccountService extends CommonService {

    /**  the api url */
    ProductApi = Constants.BASE_URL + "/account-management/managed-account";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description create a new country
     * @param country the new country
     */
    createApiImage(file: File): Promise<any> {
        debugger
        let body = new FormData();
        body.append("file", file);
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_FORM_URLENCODED_VALUE);
        var promise = this.http.post(this.ProductApi + "/upload", body)
          .toPromise()
          .then(response => response.json() as any)
          .catch(error => {
            return this.handleError(error);
          });
        return promise;
      }
    create(account: Account): Promise<any> {
        // amphitheater.status = "1";
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.ProductApi,
            account, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    // getListAm(): Promise<any> {
    //     let accessToken = this.getAccessToken();
    //     var secureHeaders = new Headers();
    //     secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    //     secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    //     var promise = this.http.get(this.AmphitheaterApi, { headers: secureHeaders })
    //         .toPromise()
    //         .then(response => response.json() as any)
    //         .catch(error => {
    //             return this.handleError(error);
    //         });
    //     return promise;
    // }


    /**
     * @description update a country
     * @param country the new country
     */
    update(account: Account): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.ProductApi,
            account, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Delete a list countries
     * @param entityIds the list ids
     */
    deleteAccountByListId(entityIds: number[]): Promise<any> {
        debugger;
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.ProductApi + "/delete-multiple/" + entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    deleteAccountById(id: number): Promise<any> {
      debugger;
      let accessToken = this.getAccessToken();
      var secureHeaders = new Headers();
      secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
      secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
      var promise = this.http.delete(this.ProductApi + "/delete/" + id, { headers: secureHeaders })
          .toPromise()
          .then(response => response.json() as any)
          .catch(error => {
              return this.handleError(error);
          });
      return promise;
  }

    /**
   * @description get page country
   * @param country the search restriction
   * @param page the paging restriction
   */
    getPageAccount(page: number): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "?page=" + page + "&size=" + Constants.PAGE_SIZE, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json()  as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Returns a list of entities
     */
    public getListAccount(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi+"/all", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description return a country by countryId
     * @param id the id of the country
     */
    findOne(id: number): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.ProductApi + "/find-id/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }



    advanceSearch(account: Account, page: number): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        let secureHeaders = new Headers();

        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        debugger;
        var promise = this.http.post(this.ProductApi + "/advance-search?page=" + page+ "&size=" + Constants.PAGE_SIZE, account, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }



}
