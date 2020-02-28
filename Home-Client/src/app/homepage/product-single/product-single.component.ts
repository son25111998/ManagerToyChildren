
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductserviceService } from '../productservice.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../product';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',

})
export class ProductSingleComponent implements OnInit {
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
  // $(document).ready(function(){

	// 	var quantitiy=0;
	// 	   $('.quantity-right-plus').click(function(e){
		        
	// 	        // Stop acting like a button
	// 	        e.preventDefault();
	// 	        // Get the field name
	// 	        var quantity = parseInt($('#quantity').val());
		        
	// 	        // If is not undefined
		            
	// 	            $('#quantity').val(quantity + 1);

		          
	// 	            // Increment
		        
	// 	    });

	// 	     $('.quantity-left-minus').click(function(e){
	// 	        // Stop acting like a button
	// 	        e.preventDefault();
	// 	        // Get the field name
	// 	        var quantity = parseInt($('#quantity').val());
		        
	// 	        // If is not undefined
		      
	// 	            // Increment
	// 	            if(quantity>0){
	// 	            $('#quantity').val(quantity - 1);
	// 	            }
	// 	    });
		    
	// 	});

