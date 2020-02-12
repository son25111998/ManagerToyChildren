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
        this.getListClassroom();
        // console.log()
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.getListClassroom();
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
      this.getListClassroom();
      })
      .catch(error => console.log("errors: " + error));

  }

  /**
   * @description : submit data
   * @param Province : the data
   */
  submit(Device) {
    if (this.isUpdate) {
      console.log(Device);
      debugger
      this.updateDevice(Device);
    } else {
      this.createClassroom(Device);
    }
  }

  /**
   * Creat a new object
   */
  private createClassroom(Device) {

    this.manufacturerService.create(Device)
    .then(response => {
      debugger
        this.getListClassroom();
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
  private updateDevice(Device) {
    this.manufacturerService.update(Device)
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
    // check Province name is valid
    if (this.ManufacturerForm.get('amount').invalid) {
      if (this.ManufacturerForm.get('amount').errors.required) {
        return false;
      }
      if (this.ManufacturerForm.get('amount').errors.pattern != null) {
        return false;
      }
      if (this.ManufacturerForm.get('amount').errors.maxlength != null) {
        return false;
      }
    }

    return true;
  }

  private getListClassroom() {
    this.categoryService.getListClassroom()
        .then(response => {
            this.listCategory = response.data;

            this.initializeClassroomSelection(0);


        }).catch(error => {
            console.log(error)
        });
}

private initializeClassroomSelection(selectItem: number) {
    debugger
    let classroom_datas = []
    var countItems = 0;
    if (this.listCategory) {
        this.listCategory.forEach(element => {
            var item = {
                id: null, text: null
            };
            item.text = element.nameClassroom
            item.id = element.idClassroom;
            classroom_datas.push(item)
            if (this.manufacturer != undefined && this.manufacturer != null ) {
                // this.indexPolicySelection = countItems;
                this.indexCategorySelection = countItems
            }
            countItems += 1
        });
    }
    this.categorySelections = classroom_datas
    console.log(this.categorySelections)
}

classroomChanged(id: number) {
    // this.ClassroomForm.get('classroom').setValue(new Classroom())
    debugger
    this.ManufacturerForm.get('classroom.idClassroom').setValue(id)
    if (!id) {
        debugger
        this.listCategory = []
        this.categorySelections = []
        this.indexCategorySelection = 0
        this.classroomChanged(0)
    } else {
        // this.getListClassroom()
    }

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
