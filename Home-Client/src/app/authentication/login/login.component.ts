import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../guard/authentication.service';
import { AlertService } from '../alert/alert.service';
// import { TranslateService } from '@ngx-translate/core';
import { LanguageItem, LanguageItemList } from '../../i18n-setting';
import { User } from '../guard/user';

import { Constants } from '../../util/constants';
const JWT_TOKEN = "JWT_TOKEN";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, AlertService]
})

/**
 * Examine the handling of login requirements
 */
export class LoginComponent implements OnInit {

  isLogin : boolean = true;
  user : any = {};
  errorname : string;
  errorpass : string;
  checkerro : boolean = false;
  model: any = {};
  returnUrl: string;
  // list language use in system
  ListLanguage: LanguageItem[];
  // the selected language
  SelectedLanguage: LanguageItem;
  // check login
  hasError: boolean = false;
  // the response data when login successful


  /**
   * 
   * @param route the route
   * @param router the router
   * @param authenticationService the authenticationService
   * @param alertService the alertService
   * @param translate the translate 
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    //private translate: TranslateService
  ) {
    this.ListLanguage = LanguageItemList;
    //translate.use(localStorage.getItem(Constants.KEY_LANGUAGE));
    // Get current language
    // this.ListLanguage.forEach(lang => {
    //   if (lang.Key === translate.currentLang) {
    //     this.SelectedLanguage = lang;
    //   }
    // });
  }

  ngOnInit() {
    debugger

    this.authenticationService.logout();
    debugger

    // get return url from route parameters or default to '/'
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * @description login
   */
  login() {
    // debugger
    this.authenticationService.login(this.model.username, this.model.password).subscribe(data=>{
  debugger
        let response : any = data;
        let resp = JSON.parse(response._body);
        let accessToken = "Bearer "+ resp.token;
        localStorage.setItem(Constants.ACCESS_TOKEN, accessToken);
        localStorage.setItem(Constants.IS_AUTHENTIC, 'true');
        debugger
        localStorage.setItem(JWT_TOKEN,resp.token);
        this.router.navigate([this.returnUrl]);
         
        },error=>{console.log(error);});
  }
  // login(){
  //   this.router.navigate(['/dash-board']);
  //   this.checkerro =false;
  //   if(this.user.username==null||this.user==''){
  //     this.errorname = "* Tên đăng nhập không được để trống."
  //     this.checkerro = true;
  //   }if(this.user.password==null||this.user==''){
  //     this.errorpass = "* Mật khẩu không được để trống.";
  //     this.checkerro = true;
  //   }
  //   if(this.checkerro)
  //     return;
  //   this.authenticationService.authenticate(this.user).subscribe(
  //     data=>{
  //       console.log(data);
  //       if(data==null){
  //         this.errorname = "* Tên đăng nhập hoặc mật khẩu không đúng.";
  //       }else{
  //         let resp = JSON.parse(JSON.stringify(data));
  //         localStorage.setItem(JWT_TOKEN,resp.token);
  //         this.router.navigate(['/dash-board']);
  //       }
  //     },error => { console.log(error);  })
  // }

  // errorUsername(){
  //   this.errorname = null;
  // }

  // errorPassword(){
  //   this.errorpass = null;
  // }

  /**
   * @description Select the language to display
   * @param lang the language
   */
  onSelectLanguage(lang: LanguageItem) {
    debugger
    this.SelectedLanguage = lang;
    localStorage.setItem(Constants.KEY_LANGUAGE, lang.Key);
    //this.translate.use(lang.Key);
  }
}