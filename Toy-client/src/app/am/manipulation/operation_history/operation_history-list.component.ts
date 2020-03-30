import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Constants } from '../../common/util/constants';
import { DialogService } from '../../common/dialog/dialog.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { ToastsManager, Toast } from 'ng2-toastr';

import { DataTable } from 'angular2-datatable';
import { OperationHistoryService } from './operation_history.service';
import { OperationHistory } from './operation_history';
import { OperationHistoryForm } from './operation_history-form.component';
import { ProductService } from '../../categories/product/product.service';
import { Product } from '../../categories/product/product';
import { AccountService } from '../../categories/account/account.service';
import { Account } from '../../categories/account/account';
import { OperationHistoryPageInfo } from './ActionHistoryPageInfo';



@Component({
    selector: 'app-operation_history-list',
    templateUrl: './operation_history-list.component.html',
    styleUrls: ['./operation_history-list.component.css'],
    providers: [OperationHistoryService, DialogService, DataTable, OperationHistoryService, AccountService, OperationHistoryService,
        ProductService]
})
export class OperationHistoryListComponent implements OnInit {

    operationHistoryInfo: OperationHistoryPageInfo;
    currentPage = 0
    filterForm: FormGroup
    // search restriction
    searchObject: OperationHistory
    checkAllItemFlag = false
    currentPageView: number = 0
    fromElement: number
    toElement: number
    // total page
    totalPages: number
    // page sizw
    pageLength: number
    // toal elements
    totalElements: number
    numberDeleteItems = 0

    listProduct: Product[]
    productSelections: Array<any> = []
    accountSelections: Array<any> = []

    listAccount: Account[]
    indexProductSelection: number
    indexAccountSelection: number

    pdroduct: Product
    listStatus = Constants.STATUS_HISTORY;

    operationHistorys: OperationHistory[]

    isRef: boolean = true
    numberRefItems: number = 0
    idOperationHistoryCountRef: Number
    checkAllItemFlagRef = false


    constructor(
        private operationHistoryService: OperationHistoryService,
        private accountService: AccountService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private router: Router,
        private translate: TranslateService,
        private authGuardSubmenu: AuthGuardSubmenu,
        public toastr: ToastsManager, vcr: ViewContainerRef,
        public productService: ProductService
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        debugger
        this.filterForm = OperationHistoryForm.operationHistoryForm(this.fb, '')
        this.searchObject = new OperationHistory()
        this.getPageOperationHistory(this.searchObject, this.currentPage)
        this.operationHistoryInfo = new OperationHistoryPageInfo()
        this.getListProduct()

    }

    /**
     * @description: Return a Page of entities meeting the search and paging restriction provided in the page and operationHistory object
     * @param operationHistory: the search restriction
     * @param page: the paging restriction
     */
    getPageOperationHistory(operationHistory: OperationHistory, page: number) {
        debugger
        this.searchObject = operationHistory;
        this.operationHistoryService.getPageOperationHistory(operationHistory, page)
            .then(response => {
                console.log(response.data);
                this.operationHistoryInfo = response.data;
                this.operationHistorys = this.operationHistoryInfo.content;
                this.pageLength = this.operationHistoryInfo.content.length;
                this.totalElements = this.operationHistoryInfo.totalElements;
                this.totalPages = this.operationHistoryInfo.totalPages;
                if (!(this.totalPages > 0)) {
                    this.currentPage = -1;
                }

                this.setCurrentPage()
                this.countNumbeRefItems()
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
            this.getPageOperationHistory(this.searchObject, this.currentPage);
        }
    }

    // set the information of the page
    private setCurrentPage() {
        if (this.operationHistoryInfo.totalElements > 0) {
            this.currentPageView = this.operationHistoryInfo.number + 1;
        }
        var numberOfElements = this.operationHistoryInfo.numberOfElements;
        var size = this.operationHistoryInfo.size;
        this.fromElement = this.operationHistoryInfo.number * size + 1;
        this.toElement = this.operationHistoryInfo.number * size + numberOfElements;
        if (this.toElement < 1) {
            this.fromElement = 0;
            this.toElement = 0;
        }
    }

    /**
     * @description Delete a list operationHistorys
     * @param entityIds the list ids
     */
    private delete(entityIds: Number[]) {
        // debugger
        this.dialogService
            .confirm('Dialog.ConfirmInfo', 'Dialog.MessageConfirm')
            .subscribe(response => {
                if (response == true) {
                    this.operationHistoryService.deleteOperationHistory(entityIds)
                        .then(response => {
                            debugger
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
                                this.getPageOperationHistory(this.searchObject, this.currentPage)
                            } else if (response.code == 400) {
                                this.translate.get('Message.DeleteFail').subscribe((res: string) => {
                                    message = res;
                                });
                                this.toastr.error('', message, { dismiss: 'controlled' })
                                    .then((toast: Toast) => {
                                        setTimeout(() => {
                                            this.toastr.dismissToast(toast);
                                        }, 3000);
                                    });
                            }

                            // this.clickReference()
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
     * @description: put the objects into the object list will be deleted
     *              Delete list object
     * @param operationHistoryId the id of object
     */
    deleteOneItem(id: string) {
        var entityIds = [];
        entityIds.push(id);
        this.delete(entityIds);

    }

    /**
     * @description: Check all items when user click the checkbox all.
     */
    checkAllItem() {
        this.checkAllItemFlag = !this.checkAllItemFlag;
        this.operationHistorys.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    checkAllItemRef() {
        this.checkAllItemFlagRef = !this.checkAllItemFlagRef;
        this.operationHistoryInfo.content.forEach(item => {
            item.checked = this.checkAllItemFlagRef;
        });
    }
    /**
     * @description: Browse the object list, put the checked objects into the object list will be deleted
     * Delete list object
     */
    deleteCheckedItems() {
        // debugger
        var entityIds = []
        this.operationHistorys.forEach(item => {
            if (item.checked == true) {
                entityIds.push(item.id);
            }
        });
        if (entityIds.length > 0) {
            this.delete(entityIds)
        }
    }

    /** 
     * Count the number of objects checked
    */
    countNumbeRefItems() {
        this.numberRefItems = 0;
        this.operationHistoryInfo.content.forEach(item => {
            if (item.checked) {
                this.numberRefItems++
                this.idOperationHistoryCountRef = item.id
            }
        });
    }

    /** 
     * Count the number of objects checked
    */
    countNumbeDeleteItems() {
        this.numberDeleteItems = 0;
        this.operationHistorys.forEach(item => {
            if (item.checked) {
                this.numberDeleteItems += 1;

            }
        });
    }

    /**
    * @description: Return list province
    */
    private getListProduct() {
        this.productService.getListProduct()
            .then(response => {
                this.listProduct = response.data;
                this.initializeProductSelection(0);
            }).catch(error => {
                console.log(error)
            });
    }
    /** 
    * @description: Get the id and name for the province list
    */
    private initializeProductSelection(selectItem: number) {
        let product_datas = []
        var countItems = 0;
        if (this.listProduct) {
            this.listProduct.forEach(element => {
                var item = {
                    id: null, text: null
                };
                item.text = element.name
                item.id = element.id;
                product_datas.push(item)
                if (item.id == selectItem) {
                    this.indexProductSelection = countItems
                }
                countItems += 1
            });
        }
        this.productSelections = product_datas
        console.log(this.productSelections)
    }
    /** 
    * @description: transmitting value when changing province
    */
    productChanged(id: number) {
        let idProvinceOld = this.filterForm.get('province').value
        this.productService.findOne(id).then((result) => {
           // this.filterForm.get('province').setValue(result.data.name)
        }).catch((err) => {
            this.filterForm.get('province').setValue("")
        });

        debugger
        if(idProvinceOld == id) {
            return
        }
       // this.lis = []
       // this.districtSelections = []
//this.indexDistrictSelection = 0
        // this.districtChanged(0)
        // if(id)
            // this.getListDistrict(id)
    }

    /**
    * @description: Return list district by id province
    */
    private getListAccount(idProvince: number) {
        // this.accountService.findByProvince(idProvince)
        //     .then(response => {
        //         debugger
        //         this.listDistrict = response.data
        //         this.initializeDistrictSelection(0)
        //     }).catch(error => {
        //         this.filterForm.get('district').setValue("")
        //         console.log(error)
        //     });
    }

    /** 
    * @description: transmitting value when changing district
    */
    // districtChanged(id: number) {
    //     debugger
    //     this.districtService.findOne(id).then((result) => {
    //         this.filterForm.get('district').setValue(result.data.name)
    //     }).catch((err) => {
    //         this.filterForm.get('district').setValue("")
    //     });
        
    // }
    /** 
    * @description: Get the id and name for the district list
    */
    // private initializeDistrictSelection(selectItem: number) {

    //     let district_datas = []
    //     var countItems = 0;
    //     this.indexDistrictSelection = null
    //     if (this.listDistrict) {
    //         this.listDistrict.forEach(element => {
    //             debugger
    //             var item = {
    //                 id: null, text: null
    //             };
    //             item.text = element.name
    //             item.id = element.id;
    //             district_datas.push(item)
    //             if (item.id == selectItem) {
    //                 this.indexDistrictSelection = countItems
    //             }
    //             countItems += 1
    //         });
    //     }
    //     this.districtSelections = district_datas
    //     console.log(this.districtSelections)
    // }

     /**
    * @description: check transfer to link
    */
    routerLinkUpdate(type) {
        debugger
        if (type == 'create') {
            this.router.navigate(['/operationHistory/create']);
        } else {
            this.operationHistoryInfo.content.forEach(item => {
                if (item.checked == true) {
                    debugger
                    this.router.navigate(['/operationHistory/' + type, item.id]);
                }
            });
        }
    }

    // To Authorize User
    isAuthoriziedNavigation(): boolean {
        var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
        return isAuthorizied;
    }

    success(translate: string) {
        let message;
        this.translate.get(translate).subscribe((res: string) => {
            message = res;
        });
        this.toastr.success('', message, { dismiss: 'controlled' })
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, 1000);
            });
    }

    notice(translate: string) {
        let message;
        this.translate.get(translate).subscribe((res: string) => {
            message = res;
        });
        this.toastr.warning('', message, { dismiss: 'controlled' })
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, 1000);
            });
    }

    error(translate: string) {
        let message;
        this.translate.get(translate).subscribe((res: string) => {
            message = res;
        });
        this.toastr.error('', message, { dismiss: 'controlled' })
            .then((toast: Toast) => {
                setTimeout(() => {
                    this.toastr.dismissToast(toast);
                }, 1000);
            });
    }

    /**
    * @description: check boolen show advanced search
    */
    toggleRef() {
        this.isRef = !this.isRef;
    }
}
