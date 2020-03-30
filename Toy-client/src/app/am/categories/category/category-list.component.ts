import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryForm } from './category-form.component';

import { CategoryService } from './category.service';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { stat } from 'fs';
import { Category } from './category';
import { DialogService } from '../../common/dialog/dialog.service';
import { PageInfo } from '../../common/util/page-info';
import { Constants } from '../../common/util/constants';
import { CategoryPageInfo } from './CategoryPageInfo';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    providers: [Category, DialogService, DataTable, CategoryService]
})
/**
 * @description: Display the list of countries and supports search, delete objects
 */
export class CategoryListComponent implements OnInit {

    categoryPageInfo: CategoryPageInfo
    // name: Amphitheater.nameAmphitheater;
    categorys: Category[];
    currentPage = 0;
    filterForm: FormGroup;
    // search restriction
    searchObject: Category;
    checkAllItemFlag = false;
    currentPageView: number;
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

    // list amphitheater to export file excel
    fromNumber: number;
    toNumber: number;
    filterObject: Category;
    switchGetCategory: boolean;

    constructor(
        private categoryService: CategoryService,
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

        this.filterForm = CategoryForm.categoryForm(this.fb, '');
        this.searchObject = new Category();
        this.getPageCategory(this.searchObject,this.currentPage);
        new PageInfo();
    }

    /**
     * @description: Return a Page of entities meeting the search and paging restriction provided in the page and country object
     * @param country: the search restriction
     * @param page: the paging restriction
     */
    getPageCategory(category:Category,currentPage: number) {
        debugger
        this.categoryService
            .getPageCategory(category,currentPage)
            .then(
                categoryInfo => {
                this.categoryPageInfo = categoryInfo.data;
                this.categorys = this.categoryPageInfo.content;
                this.pageLength = this.categoryPageInfo.content.length;
                this.totalElements = this.categoryPageInfo.totalElements;
                this.totalPages = this.categoryPageInfo.totalPages;
                if (!(this.totalPages > 0)) {
                    this.currentPage = -1;
                }

                this.setCurrentPage();
                this.countNumberDeleteItems();
            }).catch(
                error => {
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
            this.getPageCategory(this.searchObject,this.currentPage);
            // page.value = pageNumber + 1;
        }
    }

    // set the information of the page
    private setCurrentPage() {
        debugger;
        if (this.categoryPageInfo.numberOfElements > 0) {
            this.currentPageView = this.categoryPageInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }
        var numberOfElements = this.categoryPageInfo.numberOfElements;
        var size = this.categoryPageInfo.size;
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
                    this.categoryService.deleteCategoryById(entityIds)
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

                            this.getPageCategory(this.searchObject,this.currentPage);
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
        this.categoryPageInfo.content.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    /**
     * @description: Browse the object list, put the checked objects into the object list will be deleted
     * Delete list object
     */
    deleteCheckedItems() {
      var entityIds = [];
      this.categorys.forEach(item => {
          if (item.checked == true) {
              entityIds.push(item.id);
          }
      });
      if (entityIds.length > 0) {
        this.dialogService
        .confirm('Dialog.ConfirmInfo', 'Dialog.MessageConfirm')
        .subscribe(response => {
            if (response == true) {
    
                this.categoryService.deleteCategoryById(entityIds)
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
                                this.getPageCategory(this.searchObject,this.currentPage);
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
                        this.getPageCategory(this.searchObject,this.currentPage);
    
    
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
  }

    /**
     * Count the number of objects checked
    */
    countNumberDeleteItems() {
        this.numberDeleteItems = 0;
        this.categoryPageInfo.content.forEach(item => {
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
    search(category: Category, page: number) {
        this.filterObject = category;
        this.switchGetCategory = true;
        debugger;
        this.categoryService.advanceSearch(category, page)
            .then(response => {
                debugger;
                this.categoryPageInfo = response.data;
                this.categorys = response.data.content;
                this.pageLength = this.categoryPageInfo.content.length;
                this.totalElements = this.categoryPageInfo.totalElements;
                this.totalPages = this.categoryPageInfo.totalPages;
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

    routerLinkUpdate(type) {
        debugger
        if (type == 'create2') {
            this.router.navigate(['/classroom/create2']);
        } else {
            this.categoryPageInfo.content.forEach(item => {
                if (item.checked == true) {
                    debugger
                    this.router.navigate(['/classroom/' + type, item.id]);
                }
            });
        }
    }
    getNumberDeleteItems(): number {
        return this.numberDeleteItems;
    }

}
