import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../../common/util/constants';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/guard/authentication.service';
import { CommonService } from '../../common/util/common-service/common.service';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';
import { OperationHistory } from './operation_history';


@Injectable()
export class OperationHistoryService extends CommonService {
  /**  the api url */
  OperationHistoryApi = Constants.ACTIONHISTORY_URL;
  constructor(
    private http: Http,
    router: Router
) {
    super(router)
}

  getPageOperationHistory(operationHistory: OperationHistory, page: number): Promise<any> {
      debugger;
      let accessToken = this.getAccessToken();
      var secureHeaders = new Headers();
      secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
      secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
      var promise = this.http.post(this.OperationHistoryApi + "/search?page=" + page + "&size=" + Constants.PAGE_SIZE,
      operationHistory, { headers: secureHeaders })
          .toPromise()
          .then(response => response.json() as any)
          .catch(error => {
              return this.handleError(error);
          });
      return promise;
  }

  deleteOperationHistory(entityIds: Number[]): Promise<any> {
    debugger;
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.delete(this.OperationHistoryApi + "/delete-multiple/" + entityIds, { headers: secureHeaders })
        .toPromise()
        .then(response => response.json() as any)
        .catch(error => {
            return this.handleError(error);
        });
    return promise;
  }

  findOne(id: string): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.OperationHistoryApi + "/" + id, { headers: secureHeaders })
        .toPromise()
        .then(response => response.json() as any)
        .catch(error => {
            return this.handleError(error);
        });
    return promise;
}
  

  

}
