import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';
import { ManufacturerService } from '../manufacturer.service';
import { ManufacturerForm } from '../manufacturer-form.component';
import { Manufacturer } from '../Manufacturer';
import { CategoryService } from '../../category/category.service'
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product';
import { Action } from 'rxjs/scheduler/Action';
import { Constants } from '../../../common/util/constants';

@Component({
  selector: 'app-manufacturer-business',
  templateUrl: './manufacturer-business.component.html',
  providers: [ManufacturerService, ProductService, CategoryService]
})

/**
 * @description: Component management create, update
 */
export class ManufacturerBusinessComponent implements OnInit {
  private sub: any;
  /**the id of object */
  id: number;
  idDevice: number;
  product: Product;
  /** the name of business */
  business: string;
  /** the form object */
  ManufacturerForm: FormGroup;
  manufacturer: Manufacturer;
  productService: ProductService;
  isUpdate: boolean = true;
  listProduct = null;
  indexProductrSelection = null;
  productSelections = null;
  listCategory = null;
  indexCategorySelection = null;
  categorySelections = null;
  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private manufacturerService: ManufacturerService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private categoryService: CategoryService,
    private amphitheaterService: ProductService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Lấy bản ghi theo 'id' từ @PathParam

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.business = params['business'];
      this.ManufacturerForm = ManufacturerForm.ManufacturerForm(this.fb, this.business);
      if (this.business == 'create') {
        debugger
        this.isUpdate = false;
        // console.log()
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.bindingData(this.ManufacturerForm, this.id);
      }
    });
  }

  isEqualOld(thenew, type) {
    try {
      var old;
      if(type == "name") {
        old = this.manufacturer.name;
      }
      if(old != thenew && old == this.standardized(thenew, type)) {
        return false;
      } else return true;
    } catch(e) {}
  }
  standardized(thenew, type) {
    thenew = thenew.trim();
    if(type == "name") {
      thenew = thenew.split(" ").join("");
    } else {
      // console.log('xsa');
      thenew = thenew.replace(/\s+/g, ' ');
    }
    return thenew;
  }


  bindingData(manufacturerForm, id) {
    this.manufacturerService.findOne(id)
    .then(response => {
      debugger
      this.manufacturer = JSON.parse(JSON.stringify(response.data));
      ManufacturerForm.bindingData(manufacturerForm, this.manufacturer);
      // this.getListAmphitheater();
      })
      .catch(error => console.log("errors: " + error));

  }

  /**
   * @description : submit data
   * @param Province : the data
   */
  submit(Manufacturer) {
    if (this.isUpdate) {
      console.log(Manufacturer);
      debugger
      this.updateManufacturer(Manufacturer);
    } else {
      this.createManufacturer(Manufacturer);
    }
  }

  /**
   * Creat a new object
   */
  private createManufacturer(Manufacturer) {

    this.manufacturerService.create(Manufacturer)
    .then(response => {
      debugger
        this.goBack();
      })
      .catch(error => {
        let message;
        this.translate.get('Message.CreateFail').subscribe((res: string) => {
          message = res;
        });
        this.toastr.error('', message, { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });
      });
  }

  /**
   * Update a object
   * @param Province
   */
  private updateManufacturer(Manufacturer) {
    this.manufacturerService.update(Manufacturer)
      .then(response => {
        // this.getListAmphitheater();
        this.goBack();
      })
      .catch(error => {
        let message;
        this.translate.get('Message.UpdateFail').subscribe((res: string) => {
          message = res;
        });
        this.toastr.error('', message, { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });
      });
  }

  /**
   * Check data is valid
   */
  isValidForm() {

    // check Province name is valid
    if (this.ManufacturerForm.get('name').invalid) {
      if (this.ManufacturerForm.get('name').errors.required) {
        return false;
      }
      if (this.ManufacturerForm.get('name').errors.pattern != null) {
        return false;
      }
      if (this.ManufacturerForm.get('name').errors.maxlength != null) {
        return false;
      }
    }

    return true;
  }



public refreshPolicyValue(value: any): void {
    this.indexCategorySelection = null;
    this.ManufacturerForm.get('classRoom.idClassroom').setValue(null);
}

  /**
   * return to the previous page
  */
 goBack() {
    this.location.back();
  }
}
