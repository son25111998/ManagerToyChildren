import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from './productservice.service';


// import { DataTable } from 'angular2-datatable';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import { Toast } from 'ng2-toastr';

// import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Product } from 'app/homepage/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [ProductserviceService],
})
export class ShopComponent implements OnInit {
  listProduct: Product[];
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
    this.getListProduct();
  }
  private getListProduct() {
    this.productService.getListProduct()
      .then(response => {
        console.log(response.data)
        debugger
        this.listProduct = response.data;
        console.log(this.listProduct);
        //  this.init(0)
      }).catch(error => {
        console.log(error)
      });
  }
  private AddToCart(){
    
  }
}
