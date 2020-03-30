import { Component, OnInit ,ViewContainerRef} from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from './account.service';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { stat } from 'fs';
import { Account } from './account';
import { DialogService } from '../../common/dialog/dialog.service';
import { PageInfo } from '../../common/util/page-info';
import { Constants } from '../../common/util/constants';
import { AccountPageInfo } from './AccountPageInfor';
import { AccountForm } from './account-form.component';
import { Response } from '@angular/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountInfo: AccountPageInfo;
  accounts: Account[];
  // name: Amphitheater.nameAmphitheater;
  currentPage = 0;
  filterForm: FormGroup;
  // search restriction
  filterObject: Account;
  switchGetAmphitheater = false;
  checkAllItemFlag = false;
  currentPageView: number = 0;
  fromElement: number;
  toElement: number;
  // total page
  totalPages: number;
  // page sizw
  pageLength: number;
  // toal elements
  totalElements: number;
  numberDeleteItems = 0;

  listStatus = Constants.STATUS_LIST;
  fromNumber: number;
  toNumber: number;

  // list amphitheater to export file excel
  listAccount: Account[];

  constructor(
      private accountService: AccountService,
      private dialogService: DialogService,
      private fb: FormBuilder,
      private router: Router,
      private translate: TranslateService,
      public toastr: ToastsManager, vcr: ViewContainerRef,
      // public amphitheater: Amphitheater
  ) {
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
      this.filterForm = AccountForm.AccountForm(this.fb, '');
      this.filterObject = new Account();
      this.getPageAccount(this.filterObject,this.currentPage);
      new PageInfo();
  }

  /**
   * @description: Return a Page of entities meeting the search and paging restriction provided in the page and country object
   * @param country: the search restriction
   * @param page: the paging restriction
   */
  getPageAccount(account:Account,page: number) {
      debugger
      this.accountService.advanceSearch(account,page)
          .then(response => {
              console.log(response.data)
              debugger
              this.accountInfo = response.data;
              this.accounts = response.data.content;
              console.log(this.accounts)
              this.pageLength = response.data.content.length;
              console.log("page",this.pageLength)
              this.totalElements = this.accountInfo.totalElements;
              this.totalPages = this.accountInfo.totalPages;
              if (!(this.totalPages > 0)) {
                  this.currentPage = -1;
              }

              this.setCurrentPage();
              this.countNumberDeleteItems();
          }).catch(
              error => {
                  console.log("no ok");
                  console.log(error);
              });
  }

  /**
   * @description: Manage page transfers
   * @param page: Page will move to
   */
  choosePageNumber(page) {
      debugger;
      var flag = true;
      var pageNumber;

      if (page.valueAsNumber != null) {
          if (isNaN(page.valueAsNumber)) {
              flag = false;
              page.value = this.currentPage + 1;
              // this.currentPageView = 1;
          } else {
              pageNumber = page.value - 1;
          }
      } else {
          pageNumber = page;
      }

      if (flag == true && this.currentPage > pageNumber && pageNumber < 0) {
          pageNumber = 0;
      }
      if (flag == true && this.currentPage < pageNumber && pageNumber > this.totalPages - 1) {
          pageNumber = this.totalPages - 1;
      }
      if (flag == true && !Number.isInteger(pageNumber)) {
          flag = false;
          page.value = this.currentPage + 1;
      }
      if (flag == true) {

          this.currentPage = pageNumber;
          this.getPageAccount(this.filterObject,this.currentPage);
          // page.value = pageNumber + 1;
      }
  }

  // set the information of the page
  private setCurrentPage() {
      if (this.accountInfo.numberOfElements > 0) {
          this.currentPageView = this.accountInfo.number + 1;
      } else {
          this.currentPageView = 0;
      }

      var numberOfElements = this.accountInfo.numberOfElements;
      var size = this.accountInfo.size;
      this.fromNumber = (this.currentPageView - 1) * size + 1;
      this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
      if (this.toNumber < 1) {
          this.fromNumber = 0;
          this.toNumber = 0;
      }
  }

  /**
   * @description Delete a list countries
   * @param entityIds the list ids
   */
  private delete(entityIds: number[]) {
      this.dialogService
          .confirm('Confirm Information', 'Are you sure to delete?')
          .subscribe(response => {
              if (response == true) {
                  this.accountService.deleteAccountByListId(entityIds)
                      .then(response => {
                          console.log(response)
                          let message;
                          if (response.code == 200) {
                              this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                                  message = res;
                              });
                              this.toastr.success('', message, { dismiss: 'controlled' })
                                  .then((toast: Toast) => {
                                      setTimeout(() => {
                                          this.toastr.dismissToast(toast);
                                      }, 3000);
                                  });
                          } else if (response.code == 400) {
                              this.translate.get('Message.DeleteFail400').subscribe((res: string) => {
                                  message = res;
                              });
                              this.toastr.error('', message, { dismiss: 'controlled' })
                                  .then((toast: Toast) => {
                                      setTimeout(() => {
                                          this.toastr.dismissToast(toast);
                                      }, 3000);
                                  });
                          }

                          this.getPageAccount(this.filterObject,this.currentPage);
                      })
                      .catch(error => {
                          let message;
                          this.translate.get('Message.DeleteFail').subscribe((res: string) => {
                              message = res;
                          });
                          this.toastr.error('', message, { dismiss: 'controlled' })
                              .then((toast: Toast) => {
                                  setTimeout(() => {
                                      this.toastr.dismissToast(toast);
                                  }, 3000);
                              });
                      });
              }
          })
  }

  /**
   *
   * @param id
   */
  deleteOneItem(id: number) {
      debugger
      var entityIds = [];
      entityIds.push(id);
      this.delete(entityIds);

  }

  /**
   * @description: Check all items when user click the checkbox all.
   */
  checkAllItem() {
      this.checkAllItemFlag = !this.checkAllItemFlag;
      this.accountInfo.content.forEach(item => {
          item.checked = this.checkAllItemFlag;
      });
  }

  /**
   * @description: Browse the object list, put the checked objects into the object list will be deleted
   * Delete list object
   */
  deleteCheckedItems() {
    var entityIds = [];
    this.accounts.forEach(item => {
        if (item.checked == true) {
            entityIds.push(item.id);
        }
    });
    if (entityIds.length > 0) {
        this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
            .subscribe(response => {
                if (response == true) {
                    this.accountService.deleteAccountByListId(entityIds)
                        .then(response => {
                            let message;
                            if (response.code == 200) {
                              this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                                  message = res;
                              });
                              this.toastr.success('', message, { dismiss: 'controlled' })
                                  .then((toast: Toast) => {
                                      setTimeout(() => {
                                          this.toastr.dismissToast(toast);
                                      }, 3000);
                                  });
                          } else if (response.code == 400) {
                              this.translate.get('Message.DeleteFail400').subscribe((res: string) => {
                                  message = res;
                              });
                              this.toastr.error('', message, { dismiss: 'controlled' })
                                  .then((toast: Toast) => {
                                      setTimeout(() => {
                                          this.toastr.dismissToast(toast);
                                      }, 3000);
                                  });
                          }

                          this.getPageAccount(this.filterObject,this.currentPage);
                      })
                      .catch(error => {
                          let message;
                          this.translate.get('Message.DeleteFail').subscribe((res: string) => {
                              message = res;
                          });
                          this.toastr.error('', message, { dismiss: 'controlled' })
                              .then((toast: Toast) => {
                                  setTimeout(() => {
                                      this.toastr.dismissToast(toast);
                                  }, 3000);
                              });
                      });
                }
            })
    }
}

  /**
   * Count the number of objects checked
  */
  countNumberDeleteItems() {
    debugger
      this.numberDeleteItems = 0;
      this.accountInfo.content.forEach(item => {
          if (item.checked) {
              this.numberDeleteItems += 1;
          }
      });
  }

  /**
   * @description: export list country to excel
   */

  // isAuthoriziedNavigation(): boolean {
  //     var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
  //     return isAuthorizied;
  // }

  search(account: Account, page: number) {
      this.filterObject = account;
      this.switchGetAmphitheater = true;
      debugger;
      this.accountService.advanceSearch(account, page)
          .then(accountInfo => {
              debugger;
              this.accountInfo = accountInfo.data;
              this.accounts = this.accountInfo.content;
              this.pageLength = this.accountInfo.content.length;
              this.totalElements = this.accountInfo.totalElements;
              this.totalPages = this.accountInfo.totalPages;
              if (this.totalPages > 0) {
                  this.currentPage = -1;
              }
              this.setCurrentPage();
              this.countNumberDeleteItems();
          })
          .catch(error => {
              console.log(error);
          });
  }
  getNumberDeleteItems(): number {
      return this.numberDeleteItems;
  }
}
