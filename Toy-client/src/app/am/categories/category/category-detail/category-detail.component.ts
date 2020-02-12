

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Category } from '../category';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  providers: [CategoryService, ]
})

/**
 * @description: Component management show detail
 */
export class CategoryDetailComponent implements OnInit {
  private sub: any;
  id: number;
  category: Category;
  

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService,
   // private deviceService: DeviceService,
    public vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    debugger
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categoryService.findOne(this.id)
        .then(response => {
          this.category = response.data;
        })
        .catch(error => {
          console.log("errors: " + error);
        });
        // this.deviceService.findClassromByDevice(this.id)
        // .then(responseDevie => {
        //   this.device = responseDevie.data.content;
        // })
        // .catch(error => {
        //   console.log("errors: " + error);
        // })
    });
  }
  goBack() {
    this.location.back();
  }

}
