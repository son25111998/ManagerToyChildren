import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ProductserviceService } from '../homepage/productservice.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../homepage/product';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
	private sub: any;
	id: number;
	product: Product;
	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private productService: ProductserviceService,
	   // private deviceService: DeviceService,
		public vcr: ViewContainerRef
	  ) { }

  ngOnInit() {
	debugger
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.productService.findOne(this.id)
        .then(response => {
          this.product = response.data;
          console.log("data",response.data)
        })
        .catch(error => {
          console.log("errors: " + error);
        });
    });
}
goBack() {
  this.location.back();
}

}
