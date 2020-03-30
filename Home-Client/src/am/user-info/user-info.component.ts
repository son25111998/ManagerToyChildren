import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
 import { UserInfo } from './user-info';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Constants } from '../../app/util/constants';
import { UserForm } from './user-form.component';
import{Location} from '@angular/common';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [ToastsManager]
})
export class UserInfoComponent implements OnInit {

  location:Location;
  userInfo: UserInfo;
  updateInfoForm: FormGroup;
  changePasswordForm: FormGroup;
  USER:string
  constructor(
    public fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    debugger;
    this.USER = localStorage.getItem(Constants.NAME);
    this.updateInfoForm = UserForm.updateInfo(this.fb);
    this.changePasswordForm = UserForm.changePasswordForm(this.fb);
    UserForm.bindingDataInfo(this.updateInfoForm, this.userInfo);
  }
  private Return(){
    this.goBack();
  }
  goBack() {
    this.location.back();
  }

}
