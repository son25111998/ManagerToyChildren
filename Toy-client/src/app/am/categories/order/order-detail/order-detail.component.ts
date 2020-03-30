
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Order } from '../order';
import { OrderDetail } from '../OderDetail';

declare var $;
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  providers: [OrderService]
})

/**
 * @description: Component management show detail
 */
export class OrderDetailComponent implements OnInit {
  private sub: any;
  id: number;
  order: Order;
  orderDetails:OrderDetail[];
  urlPhoto: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private orderService: OrderService,
    public vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.orderService.findOne(this.id)
        .then(response => {
          this.order = response.data;
        })
        this.orderService.findByIdOrder(this.id)
        .then(response=>{
          this.orderDetails=response.data;
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
