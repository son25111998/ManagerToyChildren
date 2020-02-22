import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from './productservice.service';


// import { DataTable } from 'angular2-datatable';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import { Toast } from 'ng2-toastr';

// import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

//import { stat } from 'fs';
import { Product } from './product';
// import { DialogService } from '../../app/util/dialog/dialog.service';
import { PageInfo } from '../../app/util/page-info';
import { Constants } from '../../app/util/constants';
import { ProductPageInfo } from './ProductPageInfo';
// import { ProductForm } from './product-form.component';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  productInfo: ProductPageInfo;
  products: Product[];
  // name: Amphitheater.nameAmphitheater;
  currentPage = 0;
  //filterForm: FormGroup;
  // search restriction
  filterObject: Product;
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
  amphitheater: Product[];

  constructor(
      private productService: ProductserviceService,
     // private dialogService: DialogService,
     // private fb: FormBuilder,
      private router: Router,
     // private translate: TranslateService,
     // public toastr: ToastsManager, vcr: ViewContainerRef,
      // public amphitheater: Amphitheater
  ) {
     // this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {
    this.getPageProduct(this.currentPage);
  }
  getPageProduct(page: number) {
    debugger
    this.productService.getPageProduct(page)
        .then(response => {
            console.log(response.data)
            debugger
            this.productInfo = response.data;
            this.products = response.data.content;
            console.log(this.products)
            this.pageLength = response.data.content.length;
            console.log("page",this.pageLength)
            this.totalElements = this.productInfo.totalElements;
            this.totalPages = this.productInfo.totalPages;
            if (!(this.totalPages > 0)) {
                this.currentPage = -1;
            }

            this.setCurrentPage();
           // this.countNumberDeleteItems();
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
        this.getPageProduct(this.currentPage);
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

}
