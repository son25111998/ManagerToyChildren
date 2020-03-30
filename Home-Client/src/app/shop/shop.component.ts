import { Component, OnInit } from '@angular/core';
import { ProductService } from './productservice';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductForm } from './product-form.component';


// import { DataTable } from 'angular2-datatable';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import { Toast } from 'ng2-toastr';

// import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Product } from 'app/homepage/product';
declare var $;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [ProductService, FormBuilder],
})
export class ShopComponent implements OnInit {
  listProduct: Product[];
  filterForm: FormGroup;
  currentPage = 0;
  total: number = 0;
  manufacturers: any[];
  categorys: any[];
  filterObject: Product;
  countproduct:number=0;
  categoryId:number;
  manufacturerId:number;


  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.filterForm = ProductForm.ProductForm(this.fb, '');
    this.getListProduct();
    this.total=8;
    this.getListManfacturer();
    this.getListCategory();
    this.filterObject = new Product();

  }

  onChangeCategory($event,id){
    this.filterObject.categoryId=id;
    this.productService.getPageProduct(this.filterObject,this.currentPage)
		.then(response => {
      debugger
      this.listProduct=response.data;
      this.countproduct=response.data.lenght;
    })
    
  }
  onChangeManufacturer($event,id){
    this.filterObject.manufacturerId=id;
    this.productService.getPageProduct(this.filterObject,this.currentPage)
		.then(response => {
      debugger
      this.listProduct=response.data;
      this.countproduct=response.data.lenght;
    })
  }
  private getListProduct() {
    this.productService.getListProduct()
      .then(response => {
        debugger
        
        this.listProduct = response.data;
      }).catch(error => {
        console.log(error)
      });
  }
  private getListManfacturer() {
    this.productService.getListManufacturer()
      .then(response => {
        debugger
        this.manufacturers = response.data;
      }).catch(error => {
        console.log(error)
      });
  }
  private getListCategory() {
    this.productService.getListCategory()
      .then(response => {
        debugger
        this.categorys = response.data;
      }).catch(error => {
        console.log(error)
      });
  }
  ProductSortChanged($event) {
    if ($event.target.value == 3) {
      this.getListProduct();
    }
    else if ($event.target.value == 1) {
      this.productService.getListProductSortDesc()
        .then(response => {
          debugger
          this.listProduct = response.data.content;
        }).catch(error => {
          console.log(error)
        });
    }
    else if ($event.target.value == 2) {
      this.productService.getListProductSortAsc()
        .then(response => {
          this.listProduct = response.data.content;
        }).catch(error => {
          console.log(error)
        });
    }
  }
  ProductGetTotal($event) {
    if ($event.target.value == 1) {
      this.total = 8;
    }
    else if ($event.target.value == 2) {
      this.total = 10;
    }
    else if ($event.target.value == 3) {
      this.total = 12;
    }
  }


}


