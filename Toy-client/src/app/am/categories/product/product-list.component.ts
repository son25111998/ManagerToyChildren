import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductService } from './product.service';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { stat } from 'fs';
import { Product } from './product';
import { DialogService } from '../../common/dialog/dialog.service';
import { PageInfo } from '../../common/util/page-info';
import { Constants } from '../../common/util/constants';
import { ProductPageInfo } from './ProductPageInfo';
import { ProductForm } from './product-form.component';
import { Response } from '@angular/http';
import { Manufacturer } from '../manufacturer/Manufacturer';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    providers: [Product, DialogService, DataTable, ProductService,CategoryService,ManufacturerService]
})
/**
 * @description: Display the list of countries and supports search, delete objects
 */
export class ProductListComponent implements OnInit {

    id: number;
    isShow = false;
    indexCategorySelection: number;
    indexManufactererSelection: number;
    categorySelections: Array<any> = [];
    manufacturerSelections: Array<any> = [];
    codeManfacture: string;
    product: Product;
    listCategory: Category[]
    listManfacturer: Manufacturer[]
    productInfo: ProductPageInfo;
    products: Product[];
    // name: Amphitheater.nameAmphitheater;
    currentPage = 0;
    filterForm: FormGroup;
    // search restriction
    filterObject: Product;
    switchGetProduct = false;
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
    ProductForm: FormGroup;

    // list amphitheater to export file excel
    productsss: Product[];

    constructor(
        private productService: ProductService,
        private dialogService: DialogService,
        private categoryService: CategoryService,
        private manufacturerService: ManufacturerService,
        private fb: FormBuilder,
        private router: Router,
        private translate: TranslateService,
        public toastr: ToastsManager, vcr: ViewContainerRef,
        // public amphitheater: Amphitheater
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.filterForm = ProductForm.ProductForm(this.fb, '');
        this.filterObject = new Product();
        this.getPageProduct(this.filterObject,this.currentPage);
        new PageInfo();
        this.getListCategory();
        this.getListManfacture();
    }

    /**
     * @description: Return a Page of entities meeting the search and paging restriction provided in the page and country object
     * @param country: the search restriction
     * @param page: the paging restriction
     */
    getPageProduct(product:Product,page: number) {
        debugger
        // this.productService.getPageProduct(page)
        this.productService.advanceSearch(product,page)
            .then(response => {
                //console.log(response.data)
                debugger
                this.productInfo = response.data;
                this.products = response.data.content;
               // console.log(this.products)
                this.pageLength = response.data.content.length;
                //console.log("page",this.pageLength)
                this.totalElements = this.productInfo.totalElements;
                this.totalPages = this.productInfo.totalPages;
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
    showAdvancedSearch() {

        this.isShow = false;

    }
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
            this.getPageProduct(this.filterObject,this.currentPage);
            // page.value = pageNumber + 1;
        }
    }

    // set the information of the page
    private setCurrentPage() {
        if (this.productInfo.numberOfElements > 0) {
            this.currentPageView = this.productInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }

        var numberOfElements = this.productInfo.numberOfElements;
        var size = this.productInfo.size;
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
                    this.productService.deleteProductByListId(entityIds)
                        .then(response => {
                           // console.log(response)
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

                            this.getPageProduct(this.filterObject,this.currentPage);
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
        this.productInfo.content.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    /**
     * @description: Browse the object list, put the checked objects into the object list will be deleted
     * Delete list object
     */
    deleteCheckedItems() {
      var entityIds = [];
      this.products.forEach(item => {
          if (item.checked == true) {
              entityIds.push(item.id);
          }
      });
      if (entityIds.length > 0) {
          this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
              .subscribe(response => {
                  if (response == true) {
                      this.productService.deleteProductByListId(entityIds)
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

                            this.getPageProduct(this.filterObject,this.currentPage);
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
        this.productInfo.content.forEach(item => {
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

    search(product: Product, page: number) {
        this.filterObject = product;
        this.switchGetProduct = true;
        debugger;
        this.productService.advanceSearch(product, page)
            .then(response => {
                debugger;
                this.productInfo = response.data;
                this.products = response.data.content;
                this.pageLength = this.productInfo.content.length;
                this.totalElements = this.productInfo.totalElements;
                this.totalPages = this.productInfo.totalPages;
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
    private getListManfacture() {
        this.manufacturerService.getListManufacturer()
          .then(response => {
           // console.log("cate", response.data)
           // console.log("id", response.data.id)
            this.listManfacturer = response.data;
            if (this.product && this.product.manfacturer) {
              this.initializeManfacturerSelection(this.product.manfacturer.id);
    
            } else {
              this.initializeManfacturerSelection(0);
            }
    
          }).catch(error => {
            console.log(error)
          });
      }
    
      private initializeManfacturerSelection(selectItem: number) {
        let manfacturer_datas = []
        var countItems = 0;
        if (this.listManfacturer) {
          this.listManfacturer.forEach(element => {
         //   console.log(element);
            var item = {
              id: null, text: null
            };
            item.text = element.name;
            item.id = element.id;
            manfacturer_datas.push(item)
            if (item.id == selectItem) {
              this.indexManufactererSelection = countItems
            }
            countItems += 1
          });
        }
        this.manufacturerSelections = manfacturer_datas
       // console.log(this.manufacturerSelections)
      }
    
      manfacturerChanged(id: number) {
        //debugger 
        var id1: number
        //this.ProductForm.get('province.id').setValue(id);
        this.ProductForm.get('manufacturerId').setValue(id);
        this.manufacturerService.findOne(id).then(response => {
          this.id = response.data.id;
        //  console.log("Cáccs", response)
          //this.ProductForm.get('categoryId').setValue(this.codeCategory)
        }).catch(error => {
          console.log(error)
        });
    
      }
    
      private getListCategory() {
        this.categoryService.getListCategory()
          .then(response => {
           // console.log("cate", response.data)
           // console.log("id", response.data.id)
            this.listCategory = response.data;
            if (this.product && this.product.category) {
              this.initializeCategorySelection(this.product.category.id);
    
            } else {
              this.initializeCategorySelection(0);
            }
    
          }).catch(error => {
            console.log(error)
          });
      }
    
    
    
    
      private initializeCategorySelection(selectItem: number) {
        let category_datas = []
        var countItems = 0;
        if (this.listCategory) {
          this.listCategory.forEach(element => {
           // console.log(element);
            var item = {
              id: null, text: null
            };
            item.text = element.name;
            item.id = element.id;
            category_datas.push(item)
            if (item.id == selectItem) {
              this.indexCategorySelection = countItems
            }
            countItems += 1
          });
        }
        this.categorySelections = category_datas
       // console.log(this.categorySelections)
      }
      codeCategory: string;
      categoryChanged(id: number) {
        //debugger 
        var id1: number
        //this.ProductForm.get('province.id').setValue(id);
        this.ProductForm.get('categoryId').setValue(id);
        this.categoryService.findOne(id).then(response => {
          this.id = response.data.id;
          console.log("Cáccs", response)
          
        }).catch(error => {
          console.log(error)
        });
    
      }
}
