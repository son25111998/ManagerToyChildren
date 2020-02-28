import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';
import { AccountService } from '../account.service';
import { AccountForm } from '../account-form.component';
import { Account } from '../account';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product';
import { Action } from 'rxjs/scheduler/Action';
import { Constants } from '../../../common/util/constants';

@Component({
  selector: 'app-account-business',
  templateUrl: './account-business.component.html',
  providers: [AccountService, ProductService]
})

/**
 * @description: Component management create, update
 */
export class AccountBusinessComponent implements OnInit {
  private sub: any;
  /**the id of object */
  id: number;
  // idAmphitheater: number;
  product: Product;
  /** the name of business */
  business: string;
  /** the form object */
  accountForm: FormGroup;
  account: Account;
  isUpdate: boolean = true;
  listProduct = null;
  indexProductSelection = null;
  productSelections = null;
  listCategory = null;
  indexCategorySelection = null;
  categorySelections = null;
  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private accountService: AccountService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private productService: ProductService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Lấy bản ghi theo 'id' từ @PathParamf

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.business = params['business'];
      this.accountForm = AccountForm.AccountForm(this.fb, this.business);
      if (this.business == 'create') {
        debugger
        this.isUpdate = false;
       // this.getListProduct();
        // console.log()
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        //this.getListProduct();
        this.bindingData(this.accountForm, this.id);
      }
    });
  }

  isEqualOld(thenew, type) {
    try {
      var old;
      if (type == "name") {
        old = this.account.username;
      }
      if (old != thenew && old == this.standardized(thenew, type)) {
        return false;
      } else return true;
    } catch (e) { }
  }
  standardized(thenew, type) {
    thenew = thenew.trim();
    if (type == "name") {
      thenew = thenew.split(" ").join("");
    } else {
      // console.log('xsa');
      thenew = thenew.replace(/\s+/g, ' ');
    }
    return thenew;
  }


  bindingData(accountForm, id) {
    this.accountService.findOne(id)
      .then(response => {
        debugger
        this.account = JSON.parse(JSON.stringify(response.data));
        AccountForm.bindingData(this.accountForm, this.account);
       // this.getListProduct();
        // this.getListClassroom();
      })
      .catch(error => console.log("errors: " + error));

  }

  /**
   * @description : submit data
   * @param Province : the data
   */
  submit(account) {
    if (this.isUpdate) {
      console.log(account);
      debugger
      this.updateAccount(account);
    } else {
      this.createAccount(account);
    }
  }

  /**
   * Creat a new object
   */
  private createAccount(account) {

    this.accountService.create(account)
      .then(response => {
        debugger
        //this.getListProduct();
        this.goBack();
      })
      .catch(error => {
        let message;
        this.translate.get('Message.CreateFail').subscribe((res: string) => {
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

  /**
   * Update a object
   * @param Province
   */
  private updateAccount(account) {
    this.accountService.update(account)
      .then(response => {
        //this.getListAmphitheater();
        this.goBack();
      })
      .catch(error => {
        let message;
        this.translate.get('Message.UpdateFail').subscribe((res: string) => {
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

  /**
   * Check data is valid
   */
  isValidForm() {

    // check Province name is valid
    if (this.accountForm.get('username').invalid) {
      if (this.accountForm.get('username').errors.required) {
        return false;
      }
      if (this.accountForm.get('username').errors.pattern != null) {
        return false;
      }
      if (this.accountForm.get('username').errors.maxlength != null) {
        return false;
      }
    }
    // if (this.accountForm.get('symbol').invalid) {
    //   if (this.accountForm.get('symbol').errors.required) {
    //     return false;
    //   }
    //   if (this.accountForm.get('symbol').errors.pattern != null) {
    //     return false;
    //   }
    //   if (this.accountForm.get('symbol').errors.maxlength != null) {
    //     return false;
    //   }
    // }

    // check Province name is valid
    // if (this.accountForm.get('size').invalid) {
    //   if (this.accountForm.get('size').errors.required) {
    //     return false;
    //   }
    //   if (this.accountForm.get('size').errors.pattern != null) {
    //     return false;
    //   }
    //   if (this.accountForm.get('size').errors.maxlength != null) {
    //     return false;
    //   }
    // }

    // // // check Province name is valid
    // if (this.accountForm.get('chucNang').invalid) {
    //   if (this.accountForm.get('chucNang').errors.required) {
    //     return false;
    //   }
    //   if (this.accountForm.get('chucNang').errors.pattern != null) {
    //     return false;
    //   }
    //   if (this.accountForm.get('chucNang').errors.maxlength != null) {
    //     return false;
    //   }
    // }

    // // check Province name is valid
    // if (this.accountForm.get('amount').invalid) {
    //   if (this.accountForm.get('amount').errors.required) {
    //     return false;
    //   }
    //   if (this.accountForm.get('amount').errors.pattern != null) {
    //     return false;
    //   }
    //   if (this.accountForm.get('amount').errors.maxlength != null) {
    //     return false;
    //   }
    // }

    return true;

  }

  // private getListProduct() {
  //   this.productService.getListProduct()
  //     .then(response => {
  //       this.listProduct = response.data;

  //       this.initializeAmphitheaterSelection(0);


  //     }).catch(error => {
  //       console.log(error)
  //     });
  // }

  // private initializeAmphitheaterSelection(selectItem: number) {
  //   debugger
  //   let amphitheater_datas = []
  //   var countItems = 0;
  //   if (this.listProduct) {
  //     this.listProduct.forEach(element => {
  //       var item = {
  //         id: null, text: null
  //       };
  //       item.text = element.nameAmphitheater
  //       item.id = element.idAmphitheater;
  //       amphitheater_datas.push(item)
  //       // if(this.classroom!=undefined&&this.classroom!=null&&item.id == this.classroom.amphitheater.idProduct){
  //       //   // this.indexPolicySelection = countItems;
  //       //   this.indexAmphitheaterSelection = countItems
  //       // }
  //       countItems += 1
  //     });
  //   }
  //   this.productSelections = amphitheater_datas
  //   console.log(this.productSelections)
  // }

  // amphitheaterChanged(id: number) {
  //   // this.ClassroomForm.get('classroom').setValue(new Classroom())
  //   debugger
  //   this.accountForm.get('amphitheater.idAmphitheater').setValue(id)
  //   if (!id) {
  //     debugger
  //     this.listCategory = []
  //     this.categorySelections = []
  //     this.indexCategorySelection = 0
  //     this.amphitheaterChanged(0)
  //   } else {
  //     // this.getListAmphitheater()
  //   }

  // }

  // public refreshPolicyValue(value: any): void {
  //   this.indexProductSelection = null;
  //   this.categorySelections.get('amphitheater.idAmphitheater').setValue(null);
  // }




  // private getListClassroom(classRoomId: number) {
  //     this.classroomService.findOne(this.id)
  //     .then(response => {
  //         this.listClassroom = response.data
  //         this.initializeClassroomSelection(0)
  //     }).catch(error => {
  //         console.log(error)
  //     });
  // }

  // private initializeClassroomSelection(selectItem: number) {
  //     let classroom_datas = []
  //     var countItems = 0;
  //     if (this.listClassroom) {
  //       this.listClassroom.forEach(element => {
  //         var item = {
  //           id: null, text: null
  //         };
  //         item.text = element.classRoomName
  //         item.id = element.classroomId;
  //         classroom_datas.push(item)
  //         if (item.id == selectItem) {
  //           this.indexClassroomSelection = countItems
  //         }
  //         countItems += 1
  //       });
  //     }
  //     this.classroomSelections = classroom_datas
  //     console.log(this.classroomSelections)
  // }

  // classroomChanged(id: number) {
  //     debugger
  //     this.ClassroomForm.get('classroom.classRoomId').setValue(id)

  // }

  /**
   * return to the previous page
  */
  goBack() {
    this.location.back();
  }
}
