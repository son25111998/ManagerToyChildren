import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { HttpHeaders } from '@angular/common/http';
import { Constants } from '../../am/common/util/constants';
import { CommonService } from '../../am/common/util/common-service/common.service';
import { Router } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { HeaderField } from '../../am/common/util/header-field';
import { HeaderValue } from '../../am/common/util/header-value';

/**
 * Examine the handling of authentication requirements
 */
@Injectable()
export class AuthenticationService extends CommonService {
  // The URL call service
  userApi = Constants.AUTH_URL;

  constructor(
    private http: Http,
    protected router: Router
  ) {
    super(router);
  }

  /**
   * @description login
   * if login successfully, return a promise contains access token
   * if login fail, rerutn a promise contains error infomation
   * @param username the username
   * @param password the password
   */
  login(username: string, password: string){
    debugger
    let body = `{"username":"${username}","password":"${password}"}`;
    let headers = new Headers();
    headers.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    debugger
    return this.http.post(this.userApi+"/authenticate", body, { headers: headers });
  }
  authenticate(user : any){
  
    let headers = new Headers();
    headers.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    return this.http.post(this.userApi+"/authenticate", JSON.stringify(user), { headers: headers });
  }

  getHeader(){
    return {
      headers : new HttpHeaders({
        "Content-Type":"application/json"
      })
    };
  }


  /**
   * @description request logout to server
   */
  logout(){
    debugger
    // remove user from local storage to log user out
    // var secureHeaders = new Headers();
    // secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_FORM_URLENCODED_VALUE);
    // debugger
    // var promise = this.http.post(this.userApi + "/logout", { headers: secureHeaders })
    //   .toPromise()
    //   .then(response => response.json() as any)
    //   .catch(error => {
    //     return this.handleError(error);
    //   });
    // return promise;
     window.sessionStorage.clear();
  }

  /**
   * @description get timeout token expire
   * @param token the token
   */
  getTimeoutTokenExpires(token) {
    debugger
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.ALL_VALUE);
    debugger
    var promise = this.http.post(this.userApi + "/getTokenExpire", token)
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }
}