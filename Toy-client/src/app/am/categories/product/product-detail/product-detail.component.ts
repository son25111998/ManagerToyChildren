
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../product';

declare var $;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  providers: [ProductService]
})

/**
 * @description: Component management show detail
 */
export class ProductDetailComponent implements OnInit {
  private sub: any;
  id: number;
  product: Product;
  urlPhoto: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    public vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.productService.findOne(this.id)
        .then(response => {
          this.product = response.data;
          this.urlPhoto = 'assets/layouts/layout/img/' + this.product.thumbai;
          console.log(this.urlPhoto)
          if (this.product.thumbai != null) {
            $('#apiEditThumb').attr('src', this.urlPhoto)
          }
          else {
            $('#apiEditThumb').attr('src', "assets/layouts/layout/img/api-default.jpeg")
          }
        })
        .catch(error => {
          console.log("errors: " + error);
        })
    });
  }
  goBack() {
    this.location.back();
  }

}
