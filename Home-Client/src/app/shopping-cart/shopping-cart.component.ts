import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../homepage/productservice.service';
import { Item } from './Item';
import { Product } from 'app/homepage/product';
declare var $;
@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
})

export class ShoppingCartComponent implements OnInit {
	private items: Item[] = [];
	private total: number = 0;
	listProduct:Product[];
	product: any;
	private sub: any;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductserviceService,
		public vcr: ViewContainerRef
	) {

	}

	ngOnInit() {
		this.AddToCart();
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
	private AddToCart() {
		debugger
		this.sub = this.route.params.subscribe(params => {
			var id = params['id'];
			if (id) {
				this.productService.findOne(id)
					.then(response => {
						debugger
						this.product = response.data;
						console.log(response.data)
						if (localStorage.getItem('cart') == null) {
							debugger
							let cart: any = [];
							cart.push(JSON.stringify(this.product));
							localStorage.setItem('cart', JSON.stringify(cart));
						} else {
							let cart: any = JSON.parse(localStorage.getItem('cart'));
							let index: number = -1;
							for (var i = 0; i < cart.length; i++) {
								let item = JSON.parse(cart[i]);
								if (this.product.id == item.id) {
									index = i;
									break;
								}
							}
							if (index == -1) {
								debugger
								cart.push(JSON.stringify(this.product));
								console.log("cart",cart)
								localStorage.setItem('cart', JSON.stringify(cart));
							} else {
								debugger
								let item = JSON.parse(cart[index]);
								item.quantity += 1;
								cart[index] = JSON.stringify(item);
								localStorage.setItem("cart", JSON.stringify(cart));
							}
						}
						this.loadCart();
					})

			} else {
				this.loadCart();
			}
		});
	}
	loadCart(): void {
		debugger
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item,
				quantity: item.quantity
			});
			this.total += this.product.price * item.quantity;
			
		}
		console.log("day nay",this.items)
	}

	remove(id: number): void {
		debugger
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			debugger
			let item = JSON.parse(cart[i]);
			if (item.id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}


}

