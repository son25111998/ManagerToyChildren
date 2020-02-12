import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ManufacturerService } from '../manufacturer.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Manufacturer } from '../Manufacturer';


@Component({
  selector: 'app-manufacturer-detail',
  templateUrl: './manufacturer-detail.component.html',
  providers: [ManufacturerService]
})

/**
 * @description: Component management show detail
 */
export class ManufacturerDetailComponent implements OnInit {
  private sub: any;
  id: number;
  manufacturer: Manufacturer;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private manufacturerService: ManufacturerService,
    public vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    debugger
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.manufacturerService.findOne(this.id)
        .then(response => {
          this.manufacturer = response.data;
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
