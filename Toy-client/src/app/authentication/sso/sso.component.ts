import { Constants } from './../../am/common/util/constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-sso',
  templateUrl: './sso.component.html',
  styleUrls: ['./sso.component.css']
})
export class SsoComponent implements OnInit {

  private returnUrl: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    debugger
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    localStorage.setItem(Constants.RETURN_URL, this.returnUrl);
    console.log(AppConfig.settings.BASE_URL)
    window.location.href = AppConfig.settings.SSO_IS_AUTH_URL + "/oauth2/authorize?client_id=" + AppConfig.settings.SSO_CLIENT_ID + "&scope=openid&redirect_uri=" + encodeURIComponent(AppConfig.settings.SSO_CALLBACK_URL) + "&response_type=code";
    
  }

}
