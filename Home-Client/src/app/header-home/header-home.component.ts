import { Component, OnInit } from '@angular/core';
import { Constants } from '../util/constants';
import { Item } from '../shopping-cart/Item';
import { Product } from 'app/homepage/product';
import { DataService } from 'app/util/data.service';
@Component({
	selector: 'app-header-home',
	templateUrl: './header-home.component.html',
	styleUrls: ['./header-home.component.css'],
	providers:[DataService],
})
export class HeaderHomeComponent implements OnInit {
	message: string = '';
	USER: string
	private items: Item[] = [];
	private total: number = 0;
	listProduct: Product[];
	product: any;
	constructor(
		private data: DataService,
	) { }

	ngOnInit() {
		this.USER = localStorage.getItem(Constants.NAME);
		this.data.currentMessage.subscribe(message => this.message = message)
		//console.log("Dsadsa",this.message)
		debugger
		this.loadCart();
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
			this.total += item.quantity
			//console.log("tong",this.total)

		}
	}

}
