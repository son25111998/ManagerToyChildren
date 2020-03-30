import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { OrderForm } from './order-form.component';
import { Order } from './order';
import { OrderPageInfo } from './OrderPageInfor';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogService } from '../../common/dialog/dialog.service';
import { OrderService } from './order.service';
import { Constants } from '../../common/util/constants';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Toast } from 'ng2-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[OrderService,TranslateService]
})
export class OrderComponent implements OnInit {
  listStatus = Constants.STATUS_LIST;
  fromNumber: number;
  toNumber: number;
  filterObject: Order;
  orderInfo: OrderPageInfo;
  currentPage = 0;
  filterForm: FormGroup;
  orders: Order[];
  fromElement: number;
  toElement: number;
  // total page
  totalPages: number;
  // page sizw
  pageLength: number;
  // toal elements
  totalElements: number;
  numberDeleteItems = 0;
  currentPageView: number = 0;
  checked: boolean;
  constructor(
    private dialogService: DialogService,
    private orderService: OrderService,
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private translate: TranslateService,
  ) { 

  }

  ngOnInit() {
    this.filterForm = OrderForm.OrderForm(this.fb, '');
    this.filterObject = new Order();
    this.getPageOrder(this.filterObject,this.currentPage);


  }
  getPageOrder(order:Order,page: number) {
    debugger
    // this.productService.getPageProduct(page)
    this.orderService.advanceSearch(order,page)
        .then(response => {
            //console.log(response.data)
            debugger
            this.orderInfo = response.data;
            this.orders = response.data.content;
            console.log(this.orders)
            this.pageLength = response.data.content.length;
            //console.log("page",this.pageLength)
            this.totalElements = this.orderInfo.totalElements;
            this.totalPages = this.orderInfo.totalPages;
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
countNumberDeleteItems() {
  debugger
    this.numberDeleteItems = 0;
    this.orderInfo.content.forEach(item => {
        if (item.checked) {
            this.numberDeleteItems += 1;
        }
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
        this.getPageOrder(this.filterObject,this.currentPage);
        // page.value = pageNumber + 1;
    }
}

// set the information of the page
private setCurrentPage() {
    if (this.orderInfo.numberOfElements > 0) {
        this.currentPageView = this.orderInfo.number + 1;
    } else {
        this.currentPageView = 0;
    }

    var numberOfElements = this.orderInfo.numberOfElements;
    var size = this.orderInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
        this.fromNumber = 0;
        this.toNumber = 0;
    }
}
deleteCheckedItems() {
    var entityIds = [];
    this.orders.forEach(item => {
        if (item.checked == true) {
            entityIds.push(item.id);
        }
    });
    if (entityIds.length > 0) {
        this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
            .subscribe(response => {
                if (response == true) {
                    this.orderService.deleteOrderByListId(entityIds)
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

                          this.getPageOrder(this.filterObject,this.currentPage);
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




}
