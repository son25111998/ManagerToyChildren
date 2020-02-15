import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
