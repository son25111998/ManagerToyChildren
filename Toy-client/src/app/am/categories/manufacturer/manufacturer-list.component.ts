import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManufacturerForm } from './manufacturer-form.component';

import { ManufacturerService } from './manufacturer.service';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { stat } from 'fs';
import { Category } from '../Category/category';
import { from } from 'rxjs/observable/from';
import { Manufacturer } from './Manufacturer';
import { DialogService } from '../../common/dialog/dialog.service';
import { PageInfo } from '../../common/util/page-info';
import { Constants } from '../../common/util/constants';
import { ManufacturerPageInfo } from './ManufacturerPageInfo';

@Component({
    selector: 'app-manufacturer-list',
    templateUrl: './manufacturer-list.component.html',
    providers: [Manufacturer, DialogService, DataTable, ManufacturerService]
})
/**
 * @description: Display the list of countries and supports search, delete objects
 */
export class ManufacturerListComponent implements OnInit {

    manufacturerPageInfo: ManufacturerPageInfo;
    // name: Amphitheater.nameAmphitheater;
    currentPage = 0;
    filterForm: FormGroup;
    // search restriction
    searchObject: Manufacturer;
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
    id: number;
    deviceId: number;
    /** the name of business */
    business: string;
    category: Category
    /** the form object */
    ManufacturerForm: FormGroup;
    Manufacturer: Manufacturer;
    isUpdate: boolean = true;
    listProduct = null;
    indexCategorySelection = null;
    productSelections = null;
    listCategory = null;
    categorySelections = null;


    listStatus = Constants.STATUS_LIST;

    // list amphitheater to export file excel
    manufacturers: Manufacturer[];
    fromNumber: number;
    toNumber: number;
    filterObject: Manufacturer;
    switchGetDevice: boolean;

    constructor(
        private manufacturerService: ManufacturerService,
        // private exportExcelService: ExcelExportService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private router: Router,
        private translate: TranslateService,
        // private authGuardSubmenu: AuthGuardSubmenu,
        public toastr: ToastsManager, vcr: ViewContainerRef,
        // public amphitheater: Amphitheater
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        // this.exportExcelService = exportExcelService;
    }

    ngOnInit() {

        this.filterForm = ManufacturerForm.ManufacturerForm(this.fb, '');
        this.searchObject = new Manufacturer();
        this.getPageManufacturer(this.searchObject, this.currentPage);
        new PageInfo();
    }

    /**
     * @description: Return a Page of entities meeting the search and paging restriction provided in the page and country object
     * @param country: the search restriction
     * @param page: the paging restriction
     */
    getPageManufacturer(manufacturer: Manufacturer, page: number) {
        debugger
        this.manufacturerService.getPageManufacturer(manufacturer, page)
            .then(response => {
                debugger
                this.manufacturerPageInfo = response.data;
                console.log(this.manufacturerPageInfo)
                this.manufacturers = this.manufacturerPageInfo.content;
                this.pageLength = this.manufacturerPageInfo.content.length;
                this.totalElements = this.manufacturerPageInfo.totalElements;
                this.totalPages = this.manufacturerPageInfo.totalPages;
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

    getNumberDeleteItems(): number {
        return this.numberDeleteItems;
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
                this.currentPageView = 1;
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
            this.getPageManufacturer(this.searchObject, this.currentPage);
            // page.value = pageNumber + 1;
        }
    }

    // set the information of the page
    private setCurrentPage() {
        debugger;
        if (this.manufacturerPageInfo.numberOfElements > 0) {
            this.currentPageView = this.manufacturerPageInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }
        var numberOfElements = this.manufacturerPageInfo.numberOfElements;
        var size = this.manufacturerPageInfo.size;
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
                    this.manufacturerService.deleteManufacturerById(entityIds)
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
                                this.toastr.warning('', message, { dismiss: 'controlled' })
                                    .then((toast: Toast) => {
                                        setTimeout(() => {
                                            this.toastr.dismissToast(toast);
                                        }, 3000);
                                    });
                            }

                            this.getPageManufacturer(this.searchObject, this.currentPage);
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
        var entityIds = [];
        entityIds.push(id);
        this.delete(entityIds);

    }

    /**
     * @description: Check all items when user click the checkbox all.
     */
    checkAllItem() {
        this.checkAllItemFlag = !this.checkAllItemFlag;
        this.manufacturerPageInfo.content.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    /**
     * @description: Browse the object list, put the checked objects into the object list will be deleted
     * Delete list object
     */
    deleteCheckedItems() {
      var entityIds = [];
      this.manufacturers.forEach(item => {
          if (item.checked == true) {
              entityIds.push(item.id);
          }
      });
      if (entityIds.length > 0) {
          this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
              .subscribe(response => {
                  if (response == true) {
                      this.manufacturerService.deleteManufacturerById(entityIds)
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

                            this.getPageManufacturer(this.searchObject, this.currentPage);
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
        this.numberDeleteItems = 0;
        this.manufacturerPageInfo.content.forEach(item => {
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

    search(manufacturer: Manufacturer, page: number) {
        this.filterObject = manufacturer;
        this.switchGetDevice = true;
        debugger;
        this.manufacturerService.advanceSearch(manufacturer, page)
            .then(deviceInfo => {
                debugger;
                this.manufacturerPageInfo = deviceInfo.data;
                this.manufacturers = this.manufacturerPageInfo.content;
                this.pageLength = this.manufacturerPageInfo.content.length;
                this.totalElements = this.manufacturerPageInfo.totalElements;
                this.totalPages = this.manufacturerPageInfo.totalPages;
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


}
