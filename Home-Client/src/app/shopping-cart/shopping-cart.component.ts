import { Component, OnInit, ViewContainerRef,EventEmitter,Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../homepage/productservice';
import { Item } from './Item';
import { Product } from 'app/homepage/product';
import { DataService } from "../util/data.service";
declare var $;
@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	providers: [ProductService, DataService]
})


export class ShoppingCartComponent implements OnInit {
	private items: Item[] = [];
	private total: number = 0;
	private total1: number = 0;
	private discount: number = 0;
	listProduct: Product[];
	product: any;
	private sub: any;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		public vcr: ViewContainerRef,
		private data: DataService,
	) {

	}

	ngOnInit() {
		//	this.loadCart();
		this.AddToCart();
		this.getListProduct();
		//this.Pluss();

	}
	private getListProduct() {
		this.productService.getListProduct()
			.then(response => {
			//	console.log(response.data)
				debugger
				this.listProduct = response.data;
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
						if (localStorage.getItem('cart') == null) {
							debugger
							let cart: any = [];
							this.product.quantity = 1;
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
								this.product.quantity = 1;
								cart.push(JSON.stringify(this.product));
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
	tongtien:number=0;
	loadCart(): void {
		this.total = 0;
		this.total1 = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item: any = JSON.parse(cart[i]);
			this.items.push({
				product: item,
				quantity: item.quantity
			});
			this.discount=+item.discount;
			this.total1 += item.quantity
			this.total += item.price * item.quantity;
			this.tongtien=this.total-this.total*(this.discount/100)
			var myJSON = JSON.stringify(this.total1);
			this.data.changeMessage(myJSON);
			//console.log("day nay", this.total1)

		}

	}

	remove(id: number): void {
		debugger
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			debugger
			let item = JSON.parse(cart[i]);
			if (item.id == id) {
				item.quantity -= 1;
				if (item.quantity == 0) {
					var x = confirm("Are you sure you want to delete?");
					if(x)
					cart.splice(i, 1);
				} else
					cart[i] = JSON.stringify(item);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
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
	onChange($event,id){
		this.productService.findOne(id)
		.then(response => {
			debugger
			this.product = response.data;
				let cart: any = JSON.parse(localStorage.getItem('cart'));
				let index: number = -1;
				for (var i = 0; i < cart.length; i++) {
					let item = JSON.parse(cart[i]);
					if (this.product.id == item.id) {
						index = i;
						break;
					}
				}
					let item = JSON.parse(cart[index]);
					item.quantity = $event.target.value;
					cart[index] = JSON.stringify(item);
					localStorage.setItem("cart", JSON.stringify(cart));
			this.loadCart();
		})




	}




}

