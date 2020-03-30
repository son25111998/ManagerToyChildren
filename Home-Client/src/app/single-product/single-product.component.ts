import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductService } from '../homepage/productservice';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../homepage/product';
import { Plugins } from 'protractor/built/plugins';
declare var $;

@Component({
	selector: 'app-single-product',
	templateUrl: './single-product.component.html',
	styleUrls: ['./single-product.component.css'],
	providers: [ProductService]
})
export class SingleProductComponent implements OnInit {
	private sub: any;
	id: number;
	product: Product;
	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private productService: ProductService,
		public vcr: ViewContainerRef
	) { }

	ngOnInit() {
		this.Pluss();
		debugger
		this.sub = this.route.params.subscribe(params => {
			this.id = params['id'];
			this.productService.findOne(this.id)
				.then(response => {
					this.product = response.data;
					console.log("data", response.data)
				})
				.catch(error => {
					console.log("errors: " + error);
				});
		});
	}
	goBack() {
		this.location.back();
	}
	private Pluss() {
		$(document).ready(function () {
			var quantitiy = 0;
			$('.quantity-right-plus').click(function (e) {
				e.preventDefault();
				var quantity = parseInt($('#quantity').val());
				$('#quantity').val(quantity + 1);

			});

			$('.quantity-left-minus').click(function (e) {
				e.preventDefault();
				var quantity = parseInt($('#quantity').val());
				if (quantity > 0) {
					$('#quantity').val(quantity - 1);
				}
			});

		});
	}

}

