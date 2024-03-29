import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './app-config.model';
import { Injectable } from '@angular/core';
@Injectable()
export class AppConfig {
    static settings: IAppConfig;
    constructor(private http: HttpClient) { }
    load() {
        debugger
        const jsonFile = `assets/config/config.json`;
        return new Promise<void>((resolve, reject) => {
            debugger
            this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppConfig.settings = <IAppConfig>response;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}