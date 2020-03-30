import { Component, OnInit } from '@angular/core';
import { ProductService } from './productservice';
import { Router } from '@angular/router';
import { Product } from './product';
import { PageInfo } from '../../app/util/page-info';
import { Constants } from '../../app/util/constants';
import { ProductPageInfo } from './ProductPageInfo';

declare var $;
@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css'],
    providers: [ProductService]
})
export class HomepageComponent implements OnInit {
    isUpdate: boolean = true;
    productInfo: ProductPageInfo;
    products: Product[];
    currentPage = 0;
    filterObject: Product;
    switchGetAmphitheater = false;
    checkAllItemFlag = false;
    currentPageView: number = 0;
    fromElement: number;
    toElement: number;
    totalPages: number;
    pageLength: number;
    totalElements: number;
    numberDeleteItems = 0;
    listStatus = Constants.STATUS_LIST;
    fromNumber: number;
    toNumber: number;
    listProduct: any[];

    constructor(
        private productService: ProductService,

        private router: Router,
    ) {
    }


    ngOnInit() {
        var fullHeight = function () {

            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function () {
                $('.js-fullheight').css('height', $(window).height());
            });

        };
        fullHeight();
        this.getPageProduct(this.currentPage);
        this.getListProduct();
    }
    
    private getListProduct() {
        this.productService.getListProduct()
            .then(response => {
                this.listProduct = response.data;
            }).catch(error => {
                console.log(error)
            });
    }
    getPageProduct(page: number) {
        this.productService.getPageProduct(page)
            .then(response => {
                this.productInfo = response.data;
                this.products = response.data.content;
                this.pageLength = response.data.content.length;
                this.totalElements = this.productInfo.totalElements;
                this.totalPages = this.productInfo.totalPages;
                if (!(this.totalPages > 0)) {
                    this.currentPage = -1;
                }

                this.setCurrentPage();
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
        ;
        var flag = true;
        var pageNumber;

        if (page.valueAsNumber != null) {
            if (isNaN(page.valueAsNumber)) {
                flag = false;
                page.value = this.currentPage + 1;
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
var goHere = function() {
debugger
    $('.mouse-icon').on('click', function(event){
        
        event.preventDefault();

        $('html,body').animate({
            scrollTop: $('.goto-here').offset().top
        }, 500, 'easeInOutExpo');
        
        return false;
    });
};
goHere();
