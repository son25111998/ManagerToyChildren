

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Account } from '../account';


@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  providers: [AccountService, ]
})

/**
 * @description: Component management show detail
 */
export class AccountDetailComponent implements OnInit {
  private sub: any;
  id: number;
  account: Account;
  

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService,
   // private deviceService: DeviceService,
    public vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    debugger
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.accountService.findOne(this.id)
        .then(response => {
          this.account = response.data;
        })
        .catch(error => {
          console.log("errors: " + error);
        });
        // this.deviceService.findClassromByDevice(this.id)
        // .then(responseDevie => {
        //   this.device = responseDevie.data.content;
        // })
        // .catch(error => {
        //   console.log("errors: " + error);
        // })
    });
  }
  goBack() {
    this.location.back();
  }

}
